import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "../../alert/Alert";
import {
  useCreateAlertMutation,
} from "../../services/alertAuthApi";
import { useGetAlertsQuery } from "../../services/alertAuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const selectedAlertType = [
    "Driving Licence Expiry",
    "Fitness Expiry",
    "RC Expiry",
    "Pollution Certificate Expiry",
    "Permit Expiry",
    "Insurance Expiry",
  ];

  const [alertName, setAlertName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);

  const [allAlerts, setAllAlerts] = useState({});
  const [createAlert] = useCreateAlertMutation();
  const token = localStorage.getItem("token");
  const { data, isSuccess } = useGetAlertsQuery(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setAllAlerts(data);
    }
  }, [data, isSuccess]);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);
  const handleSaveAlert = async () => {
    if (!alertName || !vehicleNumber || !reminderDate || !selectedAlertType) {
      toast.error("Please fill in all fields");
      return;
    }
    const formattedReminderDate = new Date(reminderDate).toLocaleDateString(
      "en-GB"
    );
    const alertData = {
      alertName,
      vehicleNumber,
      alertDate: formattedReminderDate,
      alertType,
    };
    setLoading("save-alert");
    const response = await createAlert({ alertData, token });
    if (response?.data?.setAlert?.status === true) {
      toast.success("Alert Created Successfully");
      window.location.reload();
    } else {
      toast.error("Fail to create Alert. Please try again");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading("delete-alert");
    toast.info(
      "Currently, you can't delete alerts, but stay tuned—this exciting feature is launching soon!"
    );
    try {
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container my-5 pt-5">
        <div className="card w-100 shadow border-0">
          <div className="card-header shadow alert-bg-colour">
            <div className="alert" role="alert">
              <span className="">
                Note :- Create alert with required details and relyNrelax will
                notify you on selected reminder date via call, whatsapp or sms,
                email, etc.
              </span>
            </div>
          </div>
          <div className="card-body my-4 border-0">
            <div className="row">
              <div className="col-lg-8">
                <div className="alert alert-secondary">Your Alert Lists</div>
                <Alert allAlert={allAlerts} onDelete={handleDelete} />
              </div>
              <div className="col-lg-4">
                <div className="alert alert-secondary">Create Alert</div>
                <div className="container">
                  <select
                    className="form-select mb-3"
                    aria-label="Select Alert Type"
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                  >
                    <option value="">Select Alert Type</option>
                    {selectedAlertType.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alert Name"
                      value={alertName}
                      onChange={(e) => setAlertName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vehicle number"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 dateTimeInputWrapper">
                    <DatePicker
                      className="form-control dateTimeInput"
                      placeholderText="Reminder Date"
                      selected={reminderDate}
                      onChange={(date) => setReminderDate(date)}
                      dateFormat="dd/MM/yyyy"
                      wrapperClassName="dateTimeInputWrapper"
                    />
                  </div>
                  {loading === "save-alert" ? (
                    <div
                      className="btn btn-outline-success"
                      style={{ width: "100%" }}
                    >
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-outline-success btn-lg"
                        onClick={handleSaveAlert}
                      >
                        Save Alert
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
