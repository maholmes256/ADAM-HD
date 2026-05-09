import { useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import Icon from './Icon';

export default function AccountScreen({ onNavigate }) {
  const { currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const accountRole = "STUDENT";

  const labelStyle = {
    fontFamily: "var(--font-pixel)",
    fontSize: 7,
    color: "var(--gray)",
    marginBottom: 6,
    letterSpacing: "0.5px",
  };

  const inputStyle = {
    width: "100%",
    background: "#060401",
    border: "3px solid var(--border2)",
    padding: "11px 14px",
    color: "var(--sand)",
    fontFamily: "var(--font-pixel)",
    fontSize: 9,
    outline: "none",
    boxShadow: "inset 2px 2px 0 0 var(--black)",
  };

  const renderField = (label, field, key) => (
    <div key={key} style={{ marginBottom: 16 }}>
      <div style={labelStyle}>{label}</div>
      {field}
    </div>
  );

  const defaultFields = [
    {
      label: "DISPLAY NAME",
      type: "text",
      value: currentUser?.displayName || "",
    },
    {
      label: "EMAIL ADDRESS",
      type: "email",
      value: currentUser?.email || "",
    },
  ];

  return (
    <div
      className="container"
      style={{ paddingTop: 28, paddingBottom: 40, maxWidth: 580 }}
    >
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 12,
            color: "var(--sand)",
            textShadow: "1px 1px 0 var(--sand2)",
          }}
        >
          ACCOUNT INFO
        </div>
        <button
          className="px-btn px-btn-ghost"
          onClick={() => onNavigate("student")}
        >
          ◀ BACK
        </button>
      </div>

      <div className="px-box" style={{ padding: 28 }}>
        <div
          className="flex-center"
          style={{ flexDirection: "column", marginBottom: 24 }}
        >
          <div
            className="portrait"
            style={{ width: 72, height: 72, marginBottom: 12 }}
          >
            <Icon name="user" size={40} color="var(--sand)" />
          </div>
          <span className="px-badge badge-sand" style={{ fontSize: 8 }}>
            {accountRole} ACCOUNT
          </span>
        </div>

        {defaultFields.map((field) =>
          renderField(
            field.label,
            <input
              type={field.type}
              defaultValue={field.value}
              style={inputStyle}
            />,
            field.label,
          ),
        )}

        {renderField(
          "PASSWORD",
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              defaultValue=""
              style={inputStyle}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                background: "var(--leather)",
                border: "3px solid var(--border2)",
                padding: "8px 12px",
                color: "var(--sand)",
                cursor: "pointer",
                fontFamily: "var(--font-pixel)",
                fontSize: 9,
                boxShadow: "2px 2px 0 0 var(--black)",
                transition: "all 0.06s",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? "●" : "○"}
            </button>
          </div>,
        )}

        <div className="px-divider mt-20">
          <div className="px-divider-line" />
          <div className="px-divider-icon">★</div>
          <div className="px-divider-line" />
        </div>
        <div className="flex gap-12">
          <button className="px-btn px-btn-gold" style={{ flex: 1 }}>
            ▶ SAVE CHANGES
          </button>
          <button className="px-btn px-btn-red">✖ DELETE</button>
        </div>
      </div>
    </div>
  );
}
