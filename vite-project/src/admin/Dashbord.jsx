import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // काउंट्स और लोडिंग स्टोर करने के लिए स्टेट्स
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState({ products: true, customers: true });

  // 📦 1. Products की Length काउंट करने के लिए GET फंक्शन
  async function fetchProductCount() {
    try {
      const response = await fetch("http://localhost:8080/products");
      const result = await response.json();
      
      if (result.success && result.data) {
        setProductCount(result.data.length);
      } else if (Array.isArray(result)) {
        setProductCount(result.length);
      }
    } catch (error) {
      console.error("Error counting products:", error);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  }

  // 👥 2. Customers की Length काउंट करने के लिए GET फंक्शन
  async function fetchCustomerCount() {
    try {
      const response = await fetch("http://localhost:8080/user");
      const result = await response.json();
      
      if (result.success && result.data) {
        setCustomerCount(result.data.length);
      } else if (Array.isArray(result)) {
        setCustomerCount(result.length);
      }
    } catch (error) {
      console.error("Error counting customers:", error);
    } finally {
      setLoading(prev => ({ ...prev, customers: false }));
    }
  }

  // पेज लोड होते ही दोनों फंक्शंस चलेंगे
  useEffect(() => {
    fetchProductCount();
    fetchCustomerCount();
  }, []);

  return (
    <div className="admin-panel-layout-wrapper">
      
      {/* 1. LEFT SIDEBAR SECTION */}
      <aside className="admin-sidebar-navigation">
        <div className="admin-brand-logo-frame">
          <h2>BOOTS</h2>
          <span className="admin-badge-tag">ADMIN</span>
        </div>

        <nav className="admin-sidebar-menu-links">
          <ul className="admin-menu-list">
            <li className="admin-menu-item active-menu-node">
              <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
            </li>
            <li className="admin-menu-item">
              <Link to="/customers" className="admin-nav-link">Customers</Link>
            </li>
            <li className="admin-menu-item">
              <Link to="/adminproducts" className="admin-nav-link">Products</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 2. RIGHT SIDE WORKSPACE CANVAS */}
      <main className="admin-workspace-content-canvas">
        <section className="admin-core-render-viewport">
          
          {/* DASHBOARD HEADER */}
          <header className="dashboard-header">
            <div className="header-text-block">
              <h1 className="admin-main-view-heading">Welcome Back, Admin</h1>
              <p className="admin-subheading">Here is what's happening with your store today.</p>
            </div>
            
            {/* ⚡ QUICK ACTIONS BUTTONS */}
            <div className="dashboard-quick-actions">
              <Link to="/adminproducts" className="add-premium-cust-btn quick-action-btn">
                + Inventory Setup
              </Link>
              <Link to="/customers" className="btn-secondary-cancel quick-action-btn invoice-btn">
                View Invoices
              </Link>
            </div>
          </header>

          {/* REAL TIME STATISTICS CARDS GRID */}
          <div className="admin-statistics-cards-grid">
            
            {/* Card 1: Total Customers */}
            <div className="stat-card-box">
              <div className="stat-card-icon">👥</div>
              <h3>{loading.customers ? "..." : customerCount}</h3>
              <p>Total Customers</p>
            </div>

            {/* Card 2: Total Products */}
            <div className="stat-card-box">
              <div className="stat-card-icon">📦</div>
              <h3>{loading.products ? "..." : productCount}</h3>
              <p>Total Products</p>
            </div>


            {/* Card 4: Monthly Revenue */}
            <div className="stat-card-box revenue-card">
              <div className="stat-card-icon">💰</div>
              <h3 className="revenue-amount">$14,250</h3>
              <p>Monthly Revenue</p>
            </div>

          </div>

          {/* TWO COLUMN CONTENT AREA */}
          <div className="dashboard-double-column-layout">
            
            {/* LEFT COLUMN: RECENT ORDERS TABLE */}
            <div className="recent-orders-section">
              <h2 className="section-title">Recent Activity & Sales</h2>
              
              <div className="admin-table-container-card clean-table-card">
                <table className="admin-custom-data-table dashboard-activity-table">
                  <thead>
                    <tr className="table-header-row">
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#BT-9921</td>
                      <td className="customer-name-cell">Rahul Sharma</td>
                      <td>
                        <span className="status-badge status-paid">Paid</span>
                      </td>
                      <td className="amount-cell">$450.00</td>
                    </tr>
                    <tr>
                      <td>#BT-9920</td>
                      <td className="customer-name-cell">Amit Verma</td>
                      <td>
                        <span className="status-badge status-pending">Pending</span>
                      </td>
                      <td className="amount-cell">$120.00</td>
                    </tr>
                    <tr>
                      <td>#BT-9919</td>
                      <td className="customer-name-cell">Priya Patel</td>
                      <td>
                        <span className="status-badge status-paid">Paid</span>
                      </td>
                      <td className="amount-cell">$850.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: SYSTEM NOTIFICATIONS / ALERTS */}
            <div className="dashboard-sidebar-alerts">
              
              {/* Box 1: Low Stock Notification (Shoes/Boots Specific) */}
              <div className="alert-card-box low-stock-alert">
                <h4 className="alert-title-red">
                  ⚠️ Low Stock Alerts
                </h4>
                <ul className="alert-item-list">
                  <li className="alert-item">
                    <span>Suede Chelsea Boots (Size 9)</span>
                    <strong className="stock-count-warning">2 left</strong>
                  </li>
                  <li className="alert-item">
                    <span>Leather Oxford Shoes (Size 8)</span>
                    <strong className="stock-count-warning">1 left</strong>
                  </li>
                  <li className="alert-item">
                    <span>Air Sports Sneakers (Size 10)</span>
                    <strong className="stock-count-warning">3 left</strong>
                  </li>
                  <li className="alert-item">
                    <span>Classic Leather Loafers (Size 7)</span>
                    <strong className="stock-count-warning">0 Out</strong>
                  </li>
                </ul>
              </div>

              {/* Box 2: Quick Store Stats */}
              <div className="alert-card-box system-status-box">
                <h4 className="alert-title-dark">📌 Store Status</h4>
                <p className="system-status-text">
                </p>
              </div>

            </div>

          </div>

        </section>
      </main>

    </div>
  );
}

export default Dashboard;