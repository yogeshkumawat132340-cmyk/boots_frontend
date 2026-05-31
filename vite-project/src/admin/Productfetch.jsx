import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Fetch() {
  const [showForm, setShowForm] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    rating: ""
  });

  const [prdata, setprdata] = useState([]);
  const [deleteconfirm, setdeleteconfirm] = useState(null);
  const [editid, seteditid] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  // 📤 1. FETCH ALL PRODUCTS (GET)
  async function prget() {
    try {
      const response = await fetch("https://boots-backend.onrender.com/pro/products");
      const result = await response.json();
      
      if (result.success && result.data) {
        setprdata(result.data);
      } else if (Array.isArray(result)) {
        setprdata(result);
      } else {
        setprdata([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    prget();
  }, []);

  // 📥 2. FORM SUBMIT HANDLER (POST / PUT)
  async function submit(e) {
    e.preventDefault();

    if (!product.title.trim() || !product.category.trim() || !product.price || !product.image.trim()) {
      alert("Title, Category, Price and Image URL are required!");
      return;
    }

    const finalProduct = {
      title: product.title,
      category: product.category,
      price: Number(product.price),
      image: product.image,
      rating: product.rating ? Number(product.rating) : 0
    };

    const url = editid
      ? `https://boots-backend.onrender.com/pro/products/${editid}`
      : "https://boots-backend.onrender.com/pro/products";

    const method = editid ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProduct)
      });
      
      const result = await response.json();

      if (result.success || response.ok) {
        alert(editid ? "Product Updated Successfully" : "Product Added Successfully");
        prget();
        clearForm();
      } else {
        alert(result.error || result.message || "Operation failed");
      }
    } catch (error) {
      alert("Operation failed due to network error");
    }
  }

  // ❌ 3. DELETE PRODUCT FUNCTION (DELETE)
  async function remove(id) {
    try {
      const response = await fetch(`https://boots-backend.onrender.com/pro/products/${id}`, {
        method: "DELETE"
      });
      const result = await response.json();

      if (result.success || response.ok) {
        alert("Product Record Deleted");
        prget();
      } else {
        alert(result.error || "Delete operation failed");
      }
    } catch (error) {
      alert("Something went Wrong while deleting");
    }
  }

  function clearForm() {
    setProduct({
      title: "",
      category: "",
      price: "",
      image: "",
      rating: ""
    });
    seteditid(null);
    setShowForm(false);
  }

  function editproduct(item) {
    setProduct({
      title: item.title || "",
      category: item.category || "",
      price: item.price || "",
      image: item.image || "",
      rating: item.rating || ""
    });
    seteditid(item._id); 
    setShowForm(true);
  }

  return (
    <div className="admin-panel-layout-wrapper">
      
      <aside className="admin-sidebar-navigation">
                <div className="admin-brand-logo-frame">
          <h2>BOOTS</h2>
          <span className="admin-badge-tag">ADMIN</span>
        </div>

        <nav className="admin-sidebar-menu-links">
          <ul>
            <Link to="/admin/dashboard" className="admin-menu-nav-link"><li>Dashboard</li></Link>
            <Link to="/customers" className="admin-menu-nav-link"><li>Customers</li></Link>
            <Link to="/adminproducts" className="admin-menu-nav-link"><li className="active-menu-node">Products</li></Link>
          </ul>
        </nav>
      </aside>

      <main className="admin-workspace-content-canvas">
        <section className="admin-core-render-viewport">
          
          <div className="customer-view-header-row">
            <h1>Products Directory</h1>
            <button className="add-premium-cust-btn" onClick={() => { clearForm(); setShowForm(true); }}>
              + Add Product
            </button>
          </div>

          <div className="admin-table-container-card">
            <table className="admin-custom-data-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prdata.length > 0 ? (
                  prdata.map((item) => (
                    <tr key={item._id}>
                      <td data-label="Preview">
                        <img className="product-avatar-preview" src={item.image} alt={item.title} onError={(e) => { e.target.src = "https://placehold.co/44"; }} />
                      </td>
                      <td data-label="Title" className="font-bold-dark">{item.title}</td>
                      <td data-label="Category" style={{ textTransform: 'lowercase' }}>{item.category}</td>
                      <td data-label="Price" style={{ fontWeight: 'bold', color: '#059669' }}>${item.price}</td>
                      <td data-label="Rating">⭐ {item.rating || 0}</td>
                      <td data-label="Actions">
                        <div className="table-action-btn-group">
                          <button className="row-edit-btn" onClick={() => editproduct(item)}>Edit</button>
                          <button className="row-delete-btn" onClick={() => setdeleteconfirm(item._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-records-row-text">No Products Found In Inventory</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </section>
      </main>

      {showForm && (
        <div className="modal-overlay-blur">
          <div className="modal-workspace-card">
            <div className="modal-card-header">
              <h2>{editid ? "Modify Product" : "Register Product"}</h2>
              <button className="modal-close-icon-btn" onClick={clearForm}>&times;</button>
            </div>
            
            <form onSubmit={submit} className="modal-actual-form">
              <div className="form-input-node">
                <label>Product Title</label>
                <input name="title" value={product.title} onChange={handleChange} type="text" placeholder="e.g. Premium Leather Saddle" required />
              </div>

              <div className="form-input-node">
                <label>Category</label>
                <input name="category" value={product.category} onChange={handleChange} type="text" placeholder="e.g. Equipment" required />
              </div>

              <div className="form-input-node">
                <label>Price ($)</label>
                <input name="price" value={product.price} onChange={handleChange} type="number" min="0" placeholder="0.00" required />
              </div>

              <div className="form-input-node">
                <label>Rating (0-5)</label>
                <input name="rating" value={product.rating} onChange={handleChange} type="number" min="0" max="5" step="0.1" placeholder="5.0" />
              </div>

              <div className="form-input-node">
                <label>Image URL</label>
                <input name="image" value={product.image} onChange={handleChange} type="text" placeholder="https://example.com/item.jpg" required />
              </div>

              <div className="modal-action-footer-buttons">
                <button type="button" className="btn-secondary-cancel" onClick={clearForm}>Discard</button>
                <button type="submit" className="btn-primary-submit">{editid ? "Save Changes" : "Create Product"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteconfirm && (
        <div className="modal-overlay-blur">
          <div className="delete-alert-popup-box">
            <h3>Confirm Destruction</h3>
            <p>Are you sure you want to permanently erase this product record? This action is irreversible.</p>
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

export default Fetch;