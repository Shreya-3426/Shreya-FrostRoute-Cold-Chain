const $ = id => document.getElementById(id);

// Sample shipment data (replace with your own if you like)
const shipments = {
  CC1025: { status: "In Transit", cls: "ok", customer: "City Care Hospital", cargo: "Vaccines (2–8°C)", location: "NH-19 near Durgapur", temp: "4.2°C (safe)", eta: "Today, 6:30 PM", driver: "Ramesh Kumar", phone: "+91 98300 11122" },
  CC1026: { status: "Temperature Alert", cls: "warn", customer: "Fresh Dairy Co.", cargo: "Frozen dairy (−18°C)", location: "Kolkata Hub, loading bay", temp: "−12.5°C (too warm)", eta: "Delayed, new ETA 9:00 PM", driver: "Sunil Das", phone: "+91 98300 22233" },
  CC1027: { status: "Delivered", cls: "done", customer: "Green Pharmacy", cargo: "Insulin (2–8°C)", location: "Delivered to customer", temp: "5.0°C (safe)", eta: "Delivered at 11:15 AM", driver: "Amit Roy", phone: "+91 98300 33344" }
};

// Feature: track an order by ID
$("trackForm").addEventListener("submit", e => {
  e.preventDefault();
  const id = $("orderId").value.trim().toUpperCase();
  const s = shipments[id], out = $("result");
  if (!s) { out.textContent = `No shipment found for "${id}". Try CC1025, CC1026 or CC1027.`; return; }
  out.innerHTML = `<h3>${id} <span class="pill ${s.cls}">${s.status}</span></h3><ul>
    <li><b>Customer:</b> ${s.customer}</li><li><b>Cargo:</b> ${s.cargo}</li>
    <li><b>Current location:</b> ${s.location}</li><li><b>Temperature:</b> ${s.temp}</li>
    <li><b>Expected delivery:</b> ${s.eta}</li><li><b>Driver:</b> ${s.driver}, <a href="tel:${s.phone.replace(/\s/g, "")}">${s.phone}</a></li></ul>`;
});

// Dashboard chart: orders per month
const months = [["Apr", 180], ["May", 195], ["Jun", 210], ["Jul", 225], ["Aug", 215], ["Sep", 225]];
const max = Math.max(...months.map(m => m[1]));
$("chart").innerHTML = months.map(([m, v]) =>
  `<div class="bar"><span>${v}</span><i style="height:${(v / max) * 75}%"></i><span>${m}</span></div>`).join("");

// Enquiry form (front-end only confirmation)
$("enquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  $("formMsg").textContent = "Thank you! Our team will contact you within 4 business hours.";
  e.target.reset();
});
