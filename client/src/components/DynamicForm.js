import React, { useState } from "react";
import axios from "axios";

export default function DynamicForm({ schema, onSubmit, showTitle = true }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    const err = {};
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      err[field.name] = field.error || "This field is required.";
      return err;
    }

    if (field.type === "number" && value !== "") {
      const num = Number(value);
      if (field.min && num < field.min) err[field.name] = field.error || `Minimum is ${field.min}`;
      if (field.max && num > field.max) err[field.name] = field.error || `Maximum is ${field.max}`;
    }

    if (field.validator && typeof value === "string") {
      try {
        const regex = new RegExp(field.validator);
        if (!regex.test(value)) {
          err[field.name] = field.error || "Invalid format.";
        }
      } catch (e) {
        console.error("Invalid regex in validator:", field.name);
      }
    }

    return err;
  };

  const handleChange = async (field, e) => {
    let value = e.target?.value;

    if (field.type === "file") {
      const file = e.target.files[0];
      if (!file) return;

      const form = new FormData();
      form.append("file", file);

      try {
        const res = await axios({
          url: field.data.url,
          method: field.data.method || "POST",
          headers: {
            ...field.data.headers,
            "Content-Type": "multipart/form-data",
          },
          data: form,
        });
        value = res.data.url || "uploaded_file_url";
      } catch (err) {
        console.error("File upload failed:", err);
      }
    }

    setFormData((prev) => ({ ...prev, [field.name]: value }));
    const err = validate(field, value);
    setErrors((prev) => ({ ...prev, ...err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    schema.forEach((field) => {
      if (field.type === "card") {
        const nestedData = formData[field.name] || {};
        field.data.forEach((child) => {
          const val = nestedData[child.name];
          Object.assign(errs, validate(child, val));
        });

        const allNestedFilled = field.data.every((f) => nestedData[f.name]);
        if (!allNestedFilled) {
          errs[field.name] = field.error || "All education fields are mandatory.";
        }
      } else {
        const val = formData[field.name];
        Object.assign(errs, validate(field, val));
      }
    });

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] || "";

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
      case "datetime":
      case "tel":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || ""}
            value={value}
            onChange={(e) => handleChange(field, e)}
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field, e)}
          />
        );

      case "select":
        return (
          <select value={value} onChange={(e) => handleChange(field, e)}>
            <option value="">-- Select --</option>
            {field.data.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        return (
          <div>
            {field.data.map((opt) => {
              const selected = value || [];
              return (
                <label key={opt.id} style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.id)}
                    onChange={() => {
                      const newVal = new Set(selected);
                      newVal.has(opt.id) ? newVal.delete(opt.id) : newVal.add(opt.id);
                      handleChange(field, {
                        target: { value: Array.from(newVal) },
                      });
                    }}
                  />
                  {opt.title}
                </label>
              );
            })}
          </div>
        );

      case "file":
        return <input type="file" onChange={(e) => handleChange(field, e)} />;

      case "card":
        return (
          <fieldset className="card">
            <legend>{field.title}</legend>
            {field.data.map((nestedField) => (
              <div key={nestedField.name} className="form-field">
                <label>{nestedField.title}</label>
                {renderNestedField(field.name, nestedField)}
                {errors[field.name] && (
                  <div className="error">{errors[field.name]}</div>
                )}
              </div>
            ))}
          </fieldset>
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  const renderNestedField = (cardName, field) => {
    const value = (formData[cardName] || {})[field.name] || "";

    return (
      <input
        type={field.type}
        placeholder={field.placeholder || ""}
        value={value}
        onChange={(e) => {
          const newData = { ...(formData[cardName] || {}) };
          newData[field.name] = e.target.value;

          setFormData((prev) => ({ ...prev, [cardName]: newData }));
          const err = validate(field, e.target.value);
          setErrors((prev) => ({ ...prev, [cardName]: err[field.name] }));
        }}
      />
    );
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {showTitle &&<h2>Dynamic Form Creator </h2>}
      {schema.map((field) => (
        <div key={field.name} className="form-field">
          <label>{field.title}</label>
          {renderField(field)}
          {errors[field.name] && typeof errors[field.name] === "string" && (
            <div className="error">{errors[field.name]}</div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
