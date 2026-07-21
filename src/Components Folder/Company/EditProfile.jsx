import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080/api/company";

const fields = [
  ["Company Name", "companyName"],
  ["Tagline", "tagline"],
  ["Industry", "industry"],
  ["Company Size", "companySize"],
  ["Email", "email"],
  ["Website", "website"],
  ["Phone", "phone"]
];

const initialForm = {
  id: null,
  companyName: "",
  tagline: "",
  industry: "",
  email: "",
  companySize: "",
  website: "",
  phone: "",
  about: "",
  address: ""
};

export default function EditProfile() {

  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadCompany();

  }, []);

  const loadCompany = async () => {

    try {

      const res = await fetch(API);

      const data = await res.json();

      setForm({
        id: data.id,
        companyName: data.companyName || "",
        tagline: data.tagline || "",
        industry: data.industry || "",
        email: data.email || "",
        companySize: data.companySize || "",
        website: data.website || "",
        phone: data.phone || "",
        about: data.about || "",
        address: data.address || ""
      });

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const changeField = (key) => (e) => {

    setForm(prev => ({
      ...prev,
      [key]: e.target.value
    }));

  };

  const saveProfile = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Company profile updated!");

      navigate("/component-1");

    } catch (err) {

      console.error(err);
      alert("Failed to update profile");

    }

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-profile">

      <style>{`

      .edit-profile{
          width:100%;
          height:100%;
          padding:30px;
          background:#f4f6fb;
          box-sizing:border-box;
          overflow:auto;
          font-family:'Segoe UI',sans-serif;
      }

      .back{
          background:white;
          border:1px solid #ddd;
          border-radius:10px;
          padding:12px 22px;
          font-weight:600;
          cursor:pointer;
          margin-bottom:20px;
          transition:.3s;
      }

      .back:hover{
          background:#f3f3f3;
      }

      .card{
          background:white;
          border-radius:20px;
          padding:35px;
          box-shadow:0 12px 30px rgba(0,0,0,.08);
      }

    h1{
        margin:0;
        color:#7B1113;
        font-size:32px;
        font-weight:700;
    }

    .subtitle{
        margin-top:8px;
        margin-bottom:30px;
        color:#777;
        font-size:15px;
    }

    .grid{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:22px;
    }

    .field{
        display:flex;
        flex-direction:column;
    }

    .field label{
        margin-bottom:8px;
        font-size:14px;
        color:#555;
        font-weight:600;
    }

    .full{
        grid-column:1/-1;
    }

    input,
    textarea{
        width:100%;
        padding:14px 16px;
        border:1px solid #d9d9d9;
        border-radius:12px;
        background:#fafafa;
        font-size:15px;
        transition:.3s;
        box-sizing:border-box;
    }

    input:focus,
    textarea:focus{
        outline:none;
        border-color:#7B1113;
        background:white;
        box-shadow:0 0 0 4px rgba(123,17,19,.12);
    }

    textarea{
        min-height:140px;
        resize:vertical;
    }

    .actions{
        display:flex;
        justify-content:flex-end;
        gap:15px;
        margin-top:35px;
    }

    button{
        padding:13px 28px;
        border-radius:12px;
        font-size:15px;
        font-weight:600;
        cursor:pointer;
        transition:.3s;
    }

    .cancel{
        background:white;
        border:1px solid #d0d0d0;
    }

    .cancel:hover{
        background:#f3f3f3;
    }

    .save{
        background:#7B1113;
        color:white;
        border:none;
    }

    .save:hover{
        background:#991518;
        transform:translateY(-2px);
        box-shadow:0 10px 20px rgba(123,17,19,.25);
    }

    @media(max-width:900px){

        .grid{
            grid-template-columns:1fr;
        }

        .actions{
            flex-direction:column;
        }

        .actions button{
            width:100%;
        }

    }

      `}</style>

      <button
        className="back"
        onClick={() => navigate("/component-1")}
      >
        ← Back to Profile
      </button>

      <form
        className="card"
        onSubmit={saveProfile}
      >

        <h1>Edit Company Profile</h1>

        <p className="subtitle">
          Update your company information.
        </p>

        <div className="grid">

          {fields.map(([label, key]) => (

            <Field
              key={key}
              label={label}
              value={form[key]}
              onChange={changeField(key)}
            />

          ))}

          <Field
            full
            label="Address"
            value={form.address}
            onChange={changeField("address")}
          />

          <div className="field full">

            <label>About</label>

            <textarea
              value={form.about}
              onChange={changeField("about")}
            />

          </div>

        </div>

        <div className="actions">

          <button
            type="button"
            className="cancel"
            onClick={() => navigate("/component-1")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

    function Field({ label, value, onChange, full }) {

      return (
        <div className={`field ${full ? "full" : ""}`}>

          <label>{label}</label>

          <input
            value={value}
            onChange={onChange}
          />

        </div>
      );

    }