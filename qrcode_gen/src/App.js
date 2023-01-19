import { useState } from "react";
import QRCode from "react-qr-code";
import { supabase } from "./config/client";

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [qrString, setQRString] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    try {
      setQRString("");
      e.preventDefault();
      setLoading(true);
      const { error } = await supabase.from("Buildings").insert({
        name: name,
        address: address,
        city: city,
        pincode: pincode,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        await setQRString(name + "\n" + address + "\n" + city + "\n" + pincode);
      }
      await setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type={"text"}
          placeholder="Building Name*"
          required
        />
        <textarea
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          type={"text"}
          placeholder="Address*"
          required
        />
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type={"text"}
          placeholder="City*"
          required
        />
        <input
          value={pincode}
          onChange={(e) => {
            setPinCode(e.target.value);
          }}
          type={"text"}
          placeholder="Pincode*"
          required
        />
        <button type="submit">{loading ? "Loading..." : "Generate QR"}</button>
      </form>
      <div>{qrString && <QRCode value={qrString} />}</div>
    </div>
  );
}

export default App;
