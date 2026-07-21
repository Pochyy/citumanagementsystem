import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080/api/company";

export default function CompanyProfile() {

  const navigate = useNavigate();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {

      const res = await fetch(API);

      const data = await res.json();

      setCompany({
        ...data,
        stats: {
          activeInternships: 4,
          totalApplicants: 6,
          slotsRemaining: 7
        }
      });

    } catch (err) {

      console.error(err);

    }
  };

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <style>{`

      .company-profile{
          width:100%;
          height:100%;
          padding:35px;
          background:#f5f7fb;
          border-radius:18px;
          overflow:auto;
          box-sizing:border-box;
      }

      .header{
          display:flex;
          align-items:center;
          gap:20px;
          padding:25px;
          background:white;
          border-radius:18px;
          margin-bottom:25px;
          box-shadow:0 8px 20px rgba(0,0,0,.08);
      }

      .avatar{
          width:85px;
          height:85px;
          border-radius:50%;
          background:#fafafa;
          border:3px solid #8b1d23;
      }

      .title{
        flex:1;
      }

      .title h1{
        margin:0;
      }

      .title p{
        margin-top:5px;
        color:#666;
      }

      .edit-btn{
          background:#8b1d23;
          color:white;
          border:none;
          padding:12px 24px;
          border-radius:10px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
      }

      .edit-btn:hover{
          background:#6e1116;
      }

      .grid{
          display:grid;
          grid-template-columns:2fr 1fr;
          gap:20px;
          margin-top:20px;
      }

      .card{
          background:white;
          border:none;
          border-radius:18px;
          padding:24px;
          box-shadow:0 8px 18px rgba(0,0,0,.08);
      }

      .address-card{
          grid-column:1 / 3;
      }

      .card h2{
        margin-top:0;
      }

      .label{
          color:#777;
          font-size:13px;
          margin-top:15px;
      }

      .value{
          font-size:16px;
          font-weight:600;
      }

      .text{
        line-height:1.6;
      }

      .stats{
        margin-top:20px;
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:18px;
      }

      .stat{
          background:white;
          border-left:6px solid #8b1d23;
          border-radius:15px;
          padding:25px;
          text-align:center;
          box-shadow:0 6px 18px rgba(0,0,0,.08);
      }

      .stat strong{
          font-size:40px;
          color:#8b1d23;
      }

      @media (max-width: 800px) {

        .grid {
          grid-template-columns: 1fr;
        }

        .stats {
          grid-template-columns: 1fr;
        }

        .address-card {
          grid-column: auto;
        }

      }

      `}</style>

      <div className="company-profile">

        <div className="header">

          <div className="avatar">

            <svg viewBox="0 0 100 100" width="55">

              <circle
                cx="50"
                cy="35"
                r="18"
                fill="none"
                stroke="#111"
                strokeWidth="3"
              />

              <path
                d="M20 90c2-22 18-32 30-32s28 10 30 32"
                fill="none"
                stroke="#111"
                strokeWidth="3"
              />

            </svg>

          </div>

          <div className="title">

            <h1>{company.companyName}</h1>

            <p>{company.tagline}</p>

          </div>

          <button
            className="edit-btn"
            onClick={() => navigate("/component-1/edit")}
          >
            ✎ Edit Profile
          </button>

        </div>

        <div className="grid">

          <section className="card">

            <h2>Company Information</h2>

            <Info label="Industry" value={company.industry} />
            <Info label="Email" value={company.email} />
            <Info label="Company Size" value={company.companySize} />
            <Info label="Website" value={company.website} />
            <Info label="Phone" value={company.phone} />

          </section>

          <section className="card">

            <h2>About</h2>

            <p className="text">
              {company.about}
            </p>

          </section>

          <section className="card">

            <h2>Address</h2>

            <p className="text">
              {company.address}
            </p>

          </section>

        </div>

        <div className="stats">

          <Stat
            label="Active Internships"
            value={company.stats.activeInternships}
          />

          <Stat
            label="Total Applicants"
            value={company.stats.totalApplicants}
          />

          <Stat
            label="Slots Remaining"
            value={company.stats.slotsRemaining}
          />

        </div>

      </div>

          </>
        );

      }

      function Info({ label, value }) {

        return (

          <div>

            <div className="label">{label}</div>

            <div className="value">{value || "-"}</div>

          </div>

        );

      }

      function Stat({ label, value }) {

        return (

          <div className="stat">

            <span>{label}</span>

            <strong>{value}</strong>

          </div>

        );

      }