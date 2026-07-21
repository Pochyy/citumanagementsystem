import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import notifications from "./NotificationsData";

const typeStyles = {
  applicant: {
    bg: "#eef2ff",
    color: "#4338ca",
    icon: (
      <path d="M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    ),
  },

  document: {
    bg: "#ecfdf5",
    color: "#047857",
    icon: (
      <>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
      </>
    ),
  },

  reminder: {
    bg: "#fef3e2",
    color: "#b45309",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },

  accepted: {
    bg: "#ecfdf3",
    color: "#067647",
    icon: <path d="m5 13 4 4L19 7" />,
  },
};


export default function NotificationDetails() {

  const navigate = useNavigate();

  const { notificationId } = useParams();


  const notification = notifications.find(
    (item) => String(item.id) === String(notificationId)
  );


  const handleBack = () => {
    navigate("/component-9");
  };


  if (!notification) {
    return (
      <div className="not-found">

        <h2>Notification Not Found</h2>

        <button onClick={handleBack}>
          Back to notifications
        </button>

      </div>
    );
  }


  const style =
    typeStyles[notification.type] || typeStyles.reminder;



  return (

    <div className="notification-details">


      <style>{`

        .notification-details {

  width:100%;
  min-height:100vh;

  padding:40px;

  font-family:
  Inter,
  Arial,
  sans-serif;

  color:#14151a;

  background:#fafafa;

}


/* Back Button */

.notification-details__back {

  display:flex;
  align-items:center;

  gap:10px;

  padding:12px 20px;

  border-radius:25px;

  border:1px solid #e5e7eb;

  background:white;

  cursor:pointer;

  font-weight:600;

  margin-bottom:30px;

}


/* BIGGER CARD */

.notification-details__card {

  width:100%;

  max-width:1000px;

  min-height:420px;

  background:white;

  border:1px solid #e8e9ec;

  border-radius:20px;

  padding:45px;


  box-shadow:
  0 15px 35px rgba(0,0,0,0.08);

}


/* Header */

.notification-details__head {

  display:flex;

  gap:25px;

  align-items:flex-start;

  margin-bottom:35px;

}


/* Bigger Icon */

.notification-details__icon {

  width:70px;

  height:70px;

  display:flex;

  align-items:center;

  justify-content:center;

  border-radius:18px;

}


.notification-details__icon svg {

  width:35px;

  height:35px;

}


/* Bigger Title */

.notification-details__title {

  margin:0;

  font-size:28px;

  font-weight:700;

}


.notification-details__time {

  margin-top:10px;

  color:#9ca3af;

  font-size:16px;

}


/* Bigger Content */

.notification-details__body {

  min-height:160px;

  background:#fafafa;

  border:1px solid #e5e7eb;

  border-radius:16px;

  padding:30px;

  line-height:1.8;

  color:#6b7280;

  font-size:17px;

  margin-bottom:35px;

}


/* Bigger Action Button */

.notification-details__action {

  display:flex;

  align-items:center;

  gap:12px;

  padding:15px 30px;

  background:#7a2331;

  color:white;

  border:none;

  border-radius:12px;

  cursor:pointer;

  font-size:16px;

  font-weight:700;

}


.notification-details__action svg {

  width:20px;

  height:20px;

}
      `}</style>

      <button
        className="notification-details__back"
        onClick={handleBack}
      >

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >

          <path d="M19 12H5M12 19l-7-7 7-7"/>

        </svg>


        Back to notifications


      </button>
      <div className="notification-details__card">


        <div className="notification-details__head">


          <div
            className="notification-details__icon"
            style={{
              background:style.bg,
              color:style.color
            }}
          >


            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              {style.icon}

            </svg>
          </div>

          <div>


            <h1 className="notification-details__title">

              {notification.title}

            </h1>
            <p className="notification-details__time">

              {notification.time}

            </p>


          </div>


        </div>

        <p className="notification-details__body">

          {notification.fullDetail}

        </p>
        {
          notification.action && (

            <button

              className="notification-details__action"

              onClick={() =>
                navigate(notification.action.to)
              }

            >

              {notification.action.label}



              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <path d="M5 12h14M13 6l6 6-6 6"/>

              </svg>


            </button>

          )
        }



      </div>



    </div>

  );

}