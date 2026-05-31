import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

function Customer() {
  const [signdata, setsigndata] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteconfirm, setdeleteconfirm] = useState(null);

  // Mongoose Schema के अनुसार 4 फ़ील्ड्स के स्टेट्स
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState(""); 
  const [password, setpassword] = useState("");

  const [editid, seteditid] = useState(null);

  useEffect(() => {
    datasign();
  }, []);

  // 📤 1. Fetch All Customers Data (आपके GET /user रूट से सिंक)
  async function datasign() {
    try {
      const response = await fetch("https://boots-backend.onrender.com/post/user");
      const result = await response.json();
      
      if (result.success && result.data) {
        setsigndata(result.data);
      } else {
        setsigndata([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  async function remove(id) {
    try {
      const response = await fetch(`https://boots-backend.onrender.com/${id}`, {
        method: "DELETE"
      });
      const result = await response.json();

      if (result.success) {
        alert(result.message || "Customer Record Deleted");
        datasign(); 
      } else {
        alert(result.error || "Delete operation failed");
      }
    } catch (error) {
      alert("Something went Wrong while deleting");
    }
  }

  // 📥 3. Form Submit handler (अब यह सिर्फ PUT / Update करेगा)
  async function submit(e) {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !mobile || !password.trim()) {
      alert("All fields (Username, Email, Mobile, Password) are required!");
      return;
    }

    const customerData = { username, email, mobile: Number(mobile), password };
    
    // एड ऑप्शन हटने के कारण URL हमेशा अपडेट आईडी वाला ही रहेगा
    const url = `https://boots-backend.onrender.com/${editid}`;
    
    try {
      const response = await fetch(url, {
        method: "PUT", // केवल PUT मेथड का उपयोग होगा
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData)
      });
      
      const result = await response.json();

      if (result.success) {
        alert(result.message || "Data Updated Successfully");
        datasign(); 
        clearForm(); 
      } else {
        alert(result.error || result.message || "Operation failed");
      }
    } catch (error) {
      alert("Network Error: Update failed");
    }
  }

  function clearForm() {
    setusername("");
    setemail("");
    setmobile("");
    setpassword("");
    seteditid(null);
    setShowForm(false);
  }

  function editcustomer(item) {
    setusername(item.username || "");
    setemail(item.email || "");
    setmobile(item.mobile || ""); 
    setpassword(item.password || "");
    seteditid(item._id); 
    setShowForm(true);
  }

  return (
    <div className="admin-panel-layout-wrapper">
      
      {/* SIDEBAR BLOCK */}
      <aside className="admin-sidebar-navigation">
                <div className="admin-brand-logo-frame">
          <h2>BOOTS</h2>
          <span className="admin-badge-tag">ADMIN</span>
        </div>

        <nav className="admin-sidebar-menu-links">
          <ul className="admin-menu-list">
            <li className="admin-menu-item">
              <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
            </li>
            <li className="admin-menu-item active-menu-node">
              <Link to="/customers" className="admin-nav-link">Customers</Link>
            </li>
            <li className="admin-menu-item">
              <Link to="/adminproducts" className="admin-nav-link">Products</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* CORE CUSTOMERS CANVAS */}
      <main className="admin-workspace-content-canvas">
        <section className="admin-core-render-viewport">
          
          <div className="customer-view-header-row">
            <h1>Customers Directory</h1>
            {/* 🛑 यहाँ से "+ Add Customer" वाला बटन हटा दिया गया है */}
          </div>

          {/* CUSTOMERS DATA TABLE */}
          <div className="admin-table-container-card">
            <table className="admin-custom-data-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email Address</th>
                  <th>Mobile Number</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {signdata.length > 0 ? (
                  signdata.map((item) => (
                    <tr key={item._id}>
                      <td className="font-bold-dark">{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td> 
                      <td className="masked-pass">{item.password}</td>
                      <td>
                        <div className="table-action-btn-group">
                          <button className="row-edit-btn" onClick={() => editcustomer(item)}>Edit</button>
                          <button className="row-delete-btn" onClick={() => setdeleteconfirm(item._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-records-row-text">No Registered Customer Records Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </section>
      </main>

      {/* DYNAMIC OPERATION POPUP MODAL (Add / Edit Form) */}
      {showForm && (
        <div className="modal-overlay-blur">
          <div className="modal-workspace-card">
            <div className="modal-card-header">
              {/* 📝 टाइटल को हमेशा के लिए "Modify Profile" कर दिया है */}
              <h2>Modify Profile</h2>
              <button className="modal-close-icon-btn" onClick={clearForm}>&times;</button>
            </div>
            
            <form onSubmit={submit} className="modal-actual-form">
              <div className="form-input-node">
                <label>Username</label>
                <input value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="johndoe123" required />
              </div>
              
              <div className="form-input-node">
                <label>Email Address</label>
                <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="john@example.com" required />
              </div>

              <div className="form-input-node">
                <label>Mobile Number</label>
                <input value={mobile} onChange={(e) => setmobile(e.target.value)} type="number" placeholder="9876543210" required />
              </div>

              <div className="form-input-node">
                <label>Account Password</label>
                <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Enter password" required />
              </div>

              <div className="modal-action-footer-buttons">
                <button type="button" className="btn-secondary-cancel" onClick={clearForm}>Discard</button>
                {/* 📝 सबमिट बटन का टेक्स्ट भी हमेशा "Save Changes" रहेगा */}
                <button type="submit" className="btn-primary-submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteconfirm && (
        <div className="modal-overlay-blur">
          <div className="delete-alert-popup-box">
            <h3>Confirm Destruction</h3>
            <p>Are you sure you want to permanently erase this customer record?</p>
            <div className="delete-modal-action-row">
              <button className="cancel-destruction-trigger" onClick={() => setdeleteconfirm(null)}>Cancel</button>
              <button className="confirm-destruction-trigger" onClick={() => { remove(deleteconfirm); setdeleteconfirm(null); }}>Delete Record</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Customer;