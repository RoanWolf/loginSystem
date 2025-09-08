import React, { useState, useEffect } from "react";

export default function Captcha() {
  const [svg, setSvg] = useState("");
  const [uuid, setUuid] = useState("");

  const fetchCaptcha = async () => {
    const res = await fetch("http://localhost:3000/captcha/get");
    const data = await res.json();
    setSvg(data.svg);
    setUuid(data.key);
  };

  useEffect(() => {
    fetchCaptcha(); // 初始化加载一次
  }, []);

  return (
    <div>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        alt="captcha"
        onClick={fetchCaptcha} // 点击刷新
      />
      <p>uuid: {uuid}</p>
    </div>
  );
}
