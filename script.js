// Wrap DOM element selection in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded - Starting script initialization");

const createLoadPostBtn = document.querySelector(".create-load-post-button");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModal");
const cancelModalBtn = document.querySelector(".modal-footer .cancel-button");
const createLoadRequestButton = document.getElementById(
  "createLoadRequestButton"
);
const modalTitle = document.querySelector(".modal-header h2");

// Debug: Check if elements are found
console.log("DOM Elements Check:");
console.log("createLoadPostBtn:", createLoadPostBtn);
console.log("modalOverlay:", modalOverlay);
console.log("closeModalBtn:", closeModalBtn);
console.log("cancelModalBtn:", cancelModalBtn);
console.log("createLoadRequestButton:", createLoadRequestButton);
console.log("modalTitle:", modalTitle);

// Add event listeners only if elements exist
if (createLoadPostBtn) {
  console.log("Adding event listener to createLoadPostBtn");
} else {
  console.error("createLoadPostBtn not found!");
}

if (closeModalBtn) {
  console.log("closeModalBtn found");
} else {
  console.error("closeModalBtn not found!");
}

if (cancelModalBtn) {
  console.log("cancelModalBtn found");
} else {
  console.error("cancelModalBtn not found!");
}

// Accept Bid Confirmation Modal elements
const acceptBidConfirmationModalOverlay = document.getElementById(
  "acceptBidConfirmationModalOverlay"
);
const confirmationText =
  acceptBidConfirmationModalOverlay.querySelector(".confirmation-text");
const cancelAcceptBidBtn = document.getElementById("cancelAcceptBid");
const confirmAcceptBidBtn = document.getElementById("confirmAcceptBid");

// Accept Bid Success Modal elements
const acceptBidSuccessModalOverlay = document.getElementById(
  "acceptBidSuccessModalOverlay"
);
const successMessage =
  acceptBidSuccessModalOverlay?.querySelector(".success-message");

// View All Bids Modal elements
const viewAllBidsModalOverlay = document.getElementById(
  "viewAllBidsModalOverlay"
);
const viewAllBidsModalTitle = document.getElementById("viewAllBidsModalTitle");
const viewAllBidsTableBody = document.getElementById("viewAllBidsTableBody");
const closeViewAllBidsModalBtn = document.getElementById(
  "closeViewAllBidsModal"
);

// Extend Bidding Duration Modal elements
const extendBidTimeModalOverlay = document.getElementById(
  "extendBidTimeModalOverlay"
);
const closeExtendBidTimeModalBtn = document.getElementById(
  "closeExtendBidTimeModal"
);
const cancelExtendBidTimeBtn = document.getElementById("cancelExtendBidTime");
const confirmExtendBidTimeBtn = document.getElementById("confirmExtendBidTime");
const extendBiddingHrsSelect = document.getElementById("extendBiddingHrs");
const extendBiddingMinsSelect = document.getElementById("extendBiddingMins");

// Confirm Delete Modal elements
const confirmDeleteModalOverlay = document.getElementById(
  "confirmDeleteModalOverlay"
);
const closeDeleteModalBtn = document.getElementById("closeDeleteModal");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const deleteReviewDetailsBody = document.getElementById(
  "deleteReviewDetailsBody"
);
const deleteReasonTextarea = document.getElementById("deleteReason");

// Confirm Fulfill Modal elements
const confirmFulfillModalOverlay = document.getElementById(
  "confirmFulfillModalOverlay"
);
const closeFulfillModalBtn = document.getElementById("closeFulfillModal");
const cancelFulfillBtn = document.getElementById("cancelFulfill");
const confirmFulfillBtn = document.getElementById("confirmFulfill");
const fulfillReviewDetailsBody = document.getElementById(
  "fulfillReviewDetailsBody"
);
const managedByToggleButtons = document.querySelectorAll(
  ".manage-by-section .toggle-buttons button"
);
// Note: managedByOtherFields no longer exists since fields are always visible
const managedByOtherFields = null; // Removed - fields are now always visible
const transporterNameInput = document.getElementById("fulfillTransporterName");
const mobileNumberInput = document.getElementById("fulfillMobileNumber");
const fulfillNotesTextarea = document.getElementById("fulfillNotes");

// Notification Modal elements
const notificationModalOverlay = document.getElementById("notificationModal");
const closeNotificationModalBtn = document.getElementById(
  "closeNotificationModal"
);
const viewAllNotificationsLink = document.querySelector(
  ".view-all-notifications"
);
const notificationList = document.querySelector(".notification-list");
const notificationCount = document.getElementById("notificationCount");

// Truck Status Modal elements
const truckStatusModalOverlay = document.getElementById("truckStatusModalOverlay");
const closeTruckStatusModal = document.getElementById("closeTruckStatusModal");
const truckInOutHeader = document.getElementById("truckInOutHeader");
const truckInOutList = document.getElementById("truckInOutList");
const truckStatusDatePicker = document.getElementById("truckStatusDatePicker");
const truckStatusTableBody = document.getElementById("truckStatusTableBody");
const truckStatusEmptyState = document.getElementById("truckStatusEmptyState");

// Vehicle Details Modal elements
const vehicleDetailsModalOverlay = document.getElementById("vehicleDetailsModalOverlay");
const closeVehicleDetailsModal = document.getElementById("closeVehicleDetailsModal");

// Upload Invoice Modal elements
const uploadInvoiceModalOverlay = document.getElementById("uploadInvoiceModalOverlay");
const closeUploadInvoiceModal = document.getElementById("closeUploadInvoiceModal");
const cancelUploadInvoice = document.getElementById("cancelUploadInvoice");
const saveUploadInvoice = document.getElementById("saveUploadInvoice");

// File inputs
const materialFileInput = document.getElementById("materialFileInput");
const ewayFileInput = document.getElementById("ewayFileInput");
const otherFileInput = document.getElementById("otherFileInput");

// Store uploaded files
let uploadedFiles = {
  material: null,
  eway: null,
  other: null
};

// Store current truck status context
let currentTruckStatusContext = {
  postId: null,
  action: null, // 'check-in' or 'check-out'
  selectedType: 'IN',
  records: []
};

// Function to update notification count
function updateNotificationCount() {
  if (notificationList && notificationCount) {
    const notifications = notificationList.querySelectorAll("li");
    const count = notifications.length;
    
    if (count > 0) {
      notificationCount.textContent = count > 99 ? "99+" : count.toString();
      notificationCount.style.display = "flex";
      notificationCount.classList.remove("hidden");
    } else {
      notificationCount.style.display = "none";
      notificationCount.classList.add("hidden");
    }
  }
}

// Function to add a new notification (for future use)
function addNotification(message, timestamp = "1m", icon = "🔔") {
  if (notificationList) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="icon">${icon}</span>
      <div class="notification-content">
        <p>${message}</p>
        <span class="timestamp">${timestamp}</span>
      </div>
    `;
    notificationList.insertBefore(li, notificationList.firstChild);
    updateNotificationCount();
  }
}

// Function to clear all notifications (for future use)
function clearAllNotifications() {
  if (notificationList) {
    notificationList.innerHTML = "";
    updateNotificationCount();
  }
}

// Filter Modal elements
const filterModalToggle = document.getElementById("filterModalToggle");
const filterModalOverlay = document.getElementById("filterModalOverlay");
const filterModalClose = document.getElementById("filterModalClose");

// Debug: Check filter modal elements
console.log("Filter Modal Elements Check:");
console.log("filterModalToggle:", filterModalToggle);
console.log("filterModalOverlay:", filterModalOverlay);
console.log("filterModalClose:", filterModalClose);

// Page sections
const emptyStatePage = document.getElementById("emptyStatePage");
const emptyStateSeparator = document.getElementById("emptyStateSeparator");
const whatElseCanDoSection = document.getElementById("whatElseCanDoSection");
const loadPostsPage = document.getElementById("loadPostsPage");
const mainElement = document.querySelector("main"); // Get the main element
const headerElement = document.querySelector("header"); // Get the header element
const loadPostsList = document.getElementById("loadPostsList");
const tabButtons = document.querySelectorAll(".tab-button");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");
  });
});

// Data storage for load posts (for now, in memory)
let loadPosts = [
  // Sample Load Post 1
  {
    id: 1,
    postedOn: "04/02/25",
    loadPostFor: "My Transporters",
    postId: "LS18058",
    scheduleType: "One Stop",
    loadingPoint: "Navi Mumbai, Maharashtra, India",
    unloadingPoint: "Satara, Maharashtra, India",
    distance: "242 km",
    scheduleDate: "20/05/2025",
    reportingTime: "12:20 AM",
    biddingHrs: "00",
    biddingMins: "10",
    material: "Bags",
    loadWeight: "2",
    truckType: "5 MT Container",
    approxValue: "2,00,000",
    paymentTerms: "Full Freight Paid within 8 days",
    biddingTimeSeconds: 600, // 10 minutes
    requiredTrucks: "2",
    description:
      "Vehicle should be neat and clean. Vehicle should be on time and driver should be skilled.",
    status: "ongoing",
    bids: [
      {
        id: 101,
        amount: "₹20,000",
        status: "pending",
        date: "24/10/25 9:23:12 AM",
        company: "Loadsor",
        transporterName: "Manav Talwar",
        mobile: "8268007181",
        loadWeight: "1.5 MT",
      },
      {
        id: 102,
        amount: "₹22,000",
        status: "pending",
        date: "24/10/25 9:23:12 AM",
        company: "Loadsor",
        transporterName: "Manav Talwar",
        mobile: "8268007181",
        loadWeight: "1.5 MT",
      },
      { id: 103, amount: "", status: "no bid" },
    ],
  },
  // Sample Load Post 2 (Timeout example)
  {
    id: 2,
    postedOn: "04/02/25",
    loadPostFor: "Transporter Groups",
    postId: "LS17949",
    scheduleType: "One Stop",
    loadingPoint: "Pune, Maharashtra, India",
    unloadingPoint: "Bengaluru, Karnataka, India",
    distance: "800 km",
    scheduleDate: "21/05/2025",
    reportingTime: "09:00 AM",
    biddingHrs: "00",
    biddingMins: "00",
    material: "Boxes",
    loadWeight: "5",
    truckType: "Container",
    approxValue: "5,00,000",
    paymentTerms: "50% Upfront, 50% on Delivery",
    biddingTimeSeconds: 0, // Timeout
    requiredTrucks: "1",
    description: "Handle with care. Fragile items.",
    status: "ongoing",
    bids: [
      {
        id: 201,
        amount: "₹50,000",
        status: "pending",
        date: "24/10/25 9:23:12 AM",
        company: "Loadsor",
        transporterName: "Manav Talwar",
        mobile: "8268007181",
        loadWeight: "1.5 MT",
      },
      {
        id: 202,
        amount: "₹55,000",
        status: "pending",
        date: "24/10/25 9:23:12 AM",
        company: "Loadsor",
        transporterName: "Manav Talwar",
        mobile: "8268007181",
        loadWeight: "1.5 MT",
      },
      { id: 203, amount: "", status: "no bid" },
    ],
  },
  // Sample Load Post 3 (Multiple Stops example)
  {
    id: 3,
    postedOn: "05/02/25",
    loadPostFor: "Individual",
    postId: "LS19123",
    scheduleType: "Multiple Stops",
    loadingPoint: "Mumbai, Maharashtra, India",
    unloadingPoint: "Delhi, Delhi, India",
    distance: "+ 2 locations",
    scheduleDate: "22/05/2025",
    reportingTime: "10:30 AM",
    biddingHrs: "01",
    biddingMins: "00",
    material: "Electronics",
    loadWeight: "8",
    truckType: "10 MT Container",
    approxValue: "8,00,000",
    paymentTerms: "Full Freight Paid within 15 days",
    biddingTimeSeconds: 3600, // 1 hour
    requiredTrucks: "1",
    description: "Multiple pickup and delivery points. Time-sensitive delivery.",
    status: "ongoing",
    multipleStopsLocations: [
      {
        loadingPoint: "Mumbai, Maharashtra, India",
        weightLoading: "3",
        unloadingPoint: "Pune, Maharashtra, India", 
        weightUnloading: "2"
      },
      {
        loadingPoint: "Pune, Maharashtra, India",
        weightLoading: "3",
        unloadingPoint: "Nashik, Maharashtra, India",
        weightUnloading: "3"
      },
      {
        loadingPoint: "Nashik, Maharashtra, India", 
        weightLoading: "2",
        unloadingPoint: "Delhi, Delhi, India",
        weightUnloading: "2"
      }
    ],
    bids: [
      {
        id: 301,
        amount: "₹75,000",
        status: "pending",
        date: "24/10/25 10:15:30 AM",
        company: "Loadsor",
        transporterName: "Rajesh Kumar",
        mobile: "9876543210",
        loadWeight: "8 MT",
      },
      { id: 302, amount: "", status: "no bid" },
      { id: 303, amount: "", status: "no bid" },
    ],
  },
  // Sample Confirmed Posts
  {
    id: 4,
    postedOn: "02/09/25",
    loadPostFor: "My Transporters",
    postId: "LS17948",
    scheduleType: "One Stop",
    loadingPoint: "Navi Mumbai, Maharashtra, India",
    unloadingPoint: "Satara, Maharashtra, India",
    distance: "242 km",
    scheduleDate: "20/05/2025",
    reportingTime: "3 PM",
    material: "Cement",
    loadWeight: "25",
    truckType: "Tempo 9-10 MT",
    approxValue: "2,00,000",
    paymentTerms: "Full Freight Paid within 8 days so that this is for checking",
    requiredTrucks: "1",
    description: "Vehicle should be neat and clean. Vehicle should be on time and driver should be skilled.",
    status: "confirmed",
    transporterDetails: {
      contactName: "Manav",
      contactNo: "9875174769",
      bookingId: "MT078664",
      transporter: "Manav Keshav Talwar",
      vehicleNo: "MH18BZ1234",
      truckCheckIn: null,
      truckCheckOut: null,
      vehicleDetails: {
        vehicleNumber: "MH34BG5094",
        vehicleStatus: "Active",
        ownerName: "Jalendar Singh",
        registrationDate: "26th April 2019",
        registeringAuthority: "RTO Chandrapur, Maharashtra",
        fitnessValidUpto: "21st Nov 2025",
        vehicleClass: "Goods Carrier (HGV)",
        taxValidUpto: "21st Nov 2025",
        fuelType: "Diesel",
        insuranceValidUpto: "21st Nov 2025",
        emissionNorm: "Bharat Stage IV",
        puccValidUpto: "21st Nov 2025",
        vehicleAge: "6 Year, 4 Months, 2 Days"
      }
    }
  },
  {
    id: 5,
    postedOn: "01/09/25",
    loadPostFor: "All",
    postId: "LS16847",
    scheduleType: "Bulk Load",
    loadingPoint: "Delhi, Delhi, India",
    unloadingPoint: "Mumbai, Maharashtra, India",
    distance: "1,420 km",
    scheduleDate: "18/05/2025",
    reportingTime: "8 AM",
    material: "Steel",
    loadWeight: "40",
    truckType: "Container 20 MT",
    approxValue: "15,00,000",
    paymentTerms: "50% Upfront, 50% on Delivery",
    requiredTrucks: "2",
    description: "Heavy steel shipment. Experienced drivers required.",
    status: "confirmed",
    transporterDetails: {
      contactName: "Rajesh",
      contactNo: "9123456789",
      bookingId: "MT078665",
      transporter: "Rajesh Transport Co.",
      vehicleNo: "DL10AB5678",
      truckCheckIn: "2025-05-18T08:30:00",
      truckCheckOut: null,
      vehicleDetails: {
        vehicleNumber: "DL10AB5678",
        vehicleStatus: "Active",
        ownerName: "Rajesh Kumar",
        registrationDate: "15th March 2018",
        registeringAuthority: "RTO Delhi, Delhi",
        fitnessValidUpto: "15th Dec 2025",
        vehicleClass: "Goods Carrier (HGV)",
        taxValidUpto: "15th Dec 2025",
        fuelType: "Diesel",
        insuranceValidUpto: "15th Dec 2025",
        emissionNorm: "Bharat Stage VI",
        puccValidUpto: "15th Dec 2025",
        vehicleAge: "7 Year, 6 Months, 1 Days"
      }
    }
  }
];
let currentEditPostId = null; // To store the ID of the post being edited
let currentAcceptingBid = null; // To store details of the bid being accepted
let currentExtendingPostId = null; // To store the ID of the post whose bid time is being extended
let currentDeletingPostId = null; // To store the ID of the post being deleted
let currentFulfillingPostId = null; // To store the ID of the post being fulfilled
let activeTab = "ongoing"; // Default active tab

// Function to render confirmed post cards
function renderConfirmedPostCard(post) {
  const cardHtml = `
    <div class="load-post-wrapper">
      <div class="post-header">
        <div class="post-meta">
          <span>Schedule Date: <strong>${post.scheduleDate || "N/A"} | ${post.reportingTime || "N/A"}</strong></span>
        </div>
        <div class="card-actions-overflow-confirmed confirmed-actions">
          <button class="action-button confirmed-action-btn" data-action="create-memo" data-id="${post.postId}">
            <span class="icon"><img src="/assets/plusIcon.svg" alt="Create Freight Memo"></span> Create Freight Memo
          </button>
          <button class="action-button confirmed-action-btn" data-action="upload-invoice" data-id="${post.postId}">
            <span class="icon"><img src="/assets/plusIcon.svg" alt="Upload Invoice"></span> Upload Invoice
          </button>
          <button class="action-button confirmed-action-btn" data-action="view-document" data-id="${post.postId}">
            <span class="icon"><img src="/assets/viewIcon.svg" alt="View Document"></span> View Document
          </button>
          <button class="action-button confirmed-action-btn" data-action="view-pod" data-id="${post.postId}">
            <span class="icon"><img src="/assets/viewIcon.svg" alt="View POD"></span> View POD
          </button>
          <button class="action-button confirmed-action-btn" data-action="vehicle-details" data-id="${post.postId}">
            <span class="icon"><img src="/assets/truckIcon.svg" alt="Vehicle Details"></span> Vehicle Details
          </button>
        </div>
      </div>
      <div class="load-post-card-confirmed-button" data-id="${post.id}">
        <div class="card-body-confirmed">
          <div class="location-section">
            <div class="post-id-row">
              <span class="post-id-badge">Post ID: ${post.postId || "N/A"}</span>
            </div>
            <div class="location-path">
              <div class="location-line">
                <img src="/assets/location_source.svg" alt="Services" class="location-dot source">
                <div class="location-info">
                  <span class="location-label">Source:</span>
                  <span class="location-text">${post.loadingPoint || "N/A"}</span>
                </div>
              </div>
              <div class="location-connector"></div>
              <div class="distance-info">
                <span>${post.distance || "N/A"} (${post.scheduleType || "N/A"})</span>
              </div>
              <div class="location-line-end">
                <img src="/assets/location_destination.svg" alt="Services" class="location-dot destination">
                <div class="location-info">
                  <span class="location-label">Destination:</span>
                  <span class="location-text">${post.unloadingPoint || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="confirmed-details-section">
            <div class="detail-item">
              <span class="label">Contact Name:</span>
              <span class="value">${post.transporterDetails?.contactName || "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Contact No:</span>
              <span class="value">${post.transporterDetails?.contactNo || "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Material:</span>
              <span class="value">${post.material || "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Weight/Qty:</span>
              <span class="value">${post.loadWeight ? post.loadWeight + " MT" : "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Truck Type:</span>
              <span class="value">${post.truckType || "N/A"}</span>
            </div>
          </div>
          <div class="details-section confirmed-info-section">
            <div class="detail-item">
              <span class="label">Booking ID:</span>
              <span class="value">${post.transporterDetails?.bookingId || "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Transporter:</span>
              <span class="value">${post.transporterDetails?.transporter || "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Vehicle No:</span>
              <span class="value">${post.transporterDetails?.vehicleNo || "N/A"}</span>
            </div>
            <div class="detail-item">
              <span class="label">Truck Check-In:</span>
              <span class="check-time-link ${!post.transporterDetails?.truckCheckIn ? 'no-date' : ''}" data-action="check-in" data-id="${post.postId}" style="color: ${!post.transporterDetails?.truckCheckIn ? '#4442D7' : 'none'}; cursor: ${!post.transporterDetails?.truckCheckIn ? 'pointer' : 'default'};">${
                post.transporterDetails?.truckCheckIn 
                  ? new Date(post.transporterDetails.truckCheckIn).toLocaleString() 
                  : "Set Check-in Time ➔"
              }</span>
            </div>
            <div class="detail-item">
              <span class="label">Truck Check-Out:</span>
              <span class="check-time-link ${!post.transporterDetails?.truckCheckIn ? 'disabled' : ''} ${!post.transporterDetails?.truckCheckOut ? 'no-date' : ''}" data-action="check-out" data-id="${post.postId}" style="color: ${!post.transporterDetails?.truckCheckOut ? '#4442D7' : 'none'}; cursor: ${!post.transporterDetails?.truckCheckOut && post.transporterDetails?.truckCheckIn ? 'pointer' : 'default'};">${
                post.transporterDetails?.truckCheckOut 
                  ? new Date(post.transporterDetails.truckCheckOut).toLocaleString() 
                  : "Set Check-Out Time ➔"
              }</span>
            </div>
          </div>
        </div>
        <div class="description-section">
          <span class="description-label">Description:</span> <span class="description-text">${post.description || "N/A"}</span>
        </div>
      </div>
    </div>
  `;
  loadPostsList.insertAdjacentHTML("beforeend", cardHtml);
}

// Function to render load post cards
function renderLoadPosts() {
  try {
    console.log("renderLoadPosts called, loadPosts.length:", loadPosts.length);
    
    // Check if required elements exist
    if (!loadPostsList) {
      console.error("loadPostsList element not found");
      return;
    }
    if (!mainElement) {
      console.error("mainElement not found");
      return;
    }
    if (!loadPostsPage) {
      console.error("loadPostsPage element not found");
      return;
    }
    
    loadPostsList.innerHTML = ""; // Clear existing cards

    const filteredPosts = loadPosts.filter((post) => {
      if (activeTab === "ongoing") return post.status === "ongoing";
      if (activeTab === "confirmed") return post.status === "confirmed";
      if (activeTab === "completed") return post.status === "completed";
      // Add more conditions for other tabs if needed
      return true; // Show all if no specific tab is selected
    });
    
    console.log("Filtered posts for activeTab", activeTab, ":", filteredPosts.length);

    if (filteredPosts.length === 0) {
      console.log("No posts to display, showing empty state");
      mainElement.style.display = "flex"; // Show original main content
      loadPostsPage.style.display = "none"; // Hide load posts page
    } else {
      console.log("Displaying", filteredPosts.length, "posts");
      mainElement.style.display = "none"; // Hide original main content
      loadPostsPage.style.display = "flex"; // Show load posts page

    filteredPosts.forEach((post) => {
      // Check if this is a confirmed post and render different layout
      if (post.status === "confirmed") {
        renderConfirmedPostCard(post);
        return;
      }

      // Existing ongoing posts rendering logic
      // Determine bidding status and button display
      let biddingTimeDisplay = "";
      let extendButtonDisplay = "none"; // Default to hidden

      if (post.biddingTimeSeconds <= 0) {
        biddingTimeDisplay = "Timeout";
        extendButtonDisplay = "block"; // Show extend if timeout
      } else {
        // Initial timer display will be handled by startTimer
        biddingTimeDisplay = "--:--:--"; // Placeholder
      }

      let bidsHtml = "";
      let totalBidsCount = 0;
      if (post.bids && post.bids.length > 0) {
        totalBidsCount = post.bids.filter((bid) => bid.amount).length;
        bidsHtml = `
                            <div class="bid-row header">
                                <span>L1</span>
                                <span>L2</span>
                                <span>L3</span>
                            </div>
                            <div class="bid-row">
                                ${post.bids
                                  .map(
                                    (bid, index) => `
                                    <div class="bid-cell">
                                        <div class="bid-amount">${
                                          bid.amount || "--"
                                        }</div>
                                        ${
                                          bid.amount &&
                                          post.biddingTimeSeconds > 0 &&
                                          bid.status !== "accepted"
                                            ? `<button class="accept-bid-button-inline" data-id="${post.id}" data-bid-index="${index}" data-amount="${bid.amount}">Accept Bid ➔</button>`
                                            : ""
                                        }
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        `;
      } else {
        bidsHtml = `
                            <div class="bid-row header">
                                <span>L1</span>
                                <span>L2</span>
                                <span>L3</span>
                            </div>
                            <div class="bid-row">
                                <span>--</span>
                                <span>--</span>
                                <span>--</span>
                            </div>
                        `;
      }

      const cardHtml = `
                        <div class="load-post-wrapper">
                            <div class="post-header">
                                <div class="post-meta">
                                    <span>Posted On: ${
                                      post.postedOn || "N/A"
                                    }&nbsp; | &nbsp; Load Post for: &nbsp; ${
        post.loadPostFor || "N/A"
      }</span>
                                </div>
                                <div class="card-actions-overflow">
                                    <button class="action-button" data-action="edit" data-id="${
                                      post.postId
                                    }"><img src="/assets/edit.svg" alt="Edit"> Edit</button>
                                    <button class="action-button" data-action="delete" data-id="${
                                      post.postId
                                    }"><img src="/assets/delete.svg" alt="Delete"> Delete</button>
                                    <button class="action-button" data-action="fulfill" data-id="${
                                      post.postId
                                    }"><img src="/assets/thumb_up.svg" alt="Fulfill"> Ful-fill</button>
                                    <button class="action-button" data-action="refresh" data-id="${
                                      post.postId
                                    }"><img src="/assets/sync.svg" alt="Refresh"> Refresh</button>
                                </div>
                            </div>
                            <div class="load-post-card" data-id="${post.id}">
                                <div class="card-body">
                                    <div class="location-section">
                                        <div class="post-id-row">
                                            <span class="post-id-badge">Post ID: ${
                                              post.postId || "N/A"
                                            }</span>
                                            <span class="open-status">Open</span>
                                        </div>
                                        <div class="location-path">
                                            <div class="location-line">
                                               
                                                <img src="/assets/location_source.svg" alt="Services" class="location-dot source">
                                                <div class="location-info">
                                                    <span class="location-label">Source:</span>
                                                    <span class="location-text">${
                                                      post.loadingPoint || "N/A"
                                                    }</span>
                                                    ${
                                                      post.scheduleType === "Multiple Stops" && 
                                                      post.multipleStopsLocations && 
                                                      post.multipleStopsLocations.length > 1
                                                        ? `<div class="multiple-locations-wrapper">
                                                            <span class="multiple-locations-text" data-post-id="${post.id}">+ ${post.multipleStopsLocations.length - 1} locations</span>
                                                            <div class="location-tooltip" id="tooltip-${post.id}">
                                                              ${post.multipleStopsLocations.slice(1).map(loc => `
                                                                <div class="tooltip-location">${loc.loadingPoint || 'N/A'}</div>
                                                              `).join('')}
                                                            </div>
                                                          </div>`
                                                        : ""
                                                    }
                                                </div>
                                            </div>
                                            <div class="location-connector"></div>
                                            <div class="distance-info">
                                                <span>${
                                                  post.scheduleType === "Multiple Stops" 
                                                    ? "Multiple Stops" 
                                                    : (post.distance || "N/A")
                                                } ${
                                                  post.scheduleType === "Multiple Stops" 
                                                    ? ""
                                                    : `(${post.scheduleType || "N/A"})`
                                                }</span>
                                            </div>
                                            <div class="location-line-end">
                                                <img src="/assets/location_destination.svg" alt="Services" class="location-dot destination">
                                                <div class="location-info">
                                                    <span class="location-label">Destination:</span>
                                                    <span class="location-text">${
                                                      post.unloadingPoint ||
                                                      "N/A"
                                                    }</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="schedule-info">
                                            <span>Schedule on: <strong>${
                                              post.scheduleDate || "N/A"
                                            }</strong> | <strong>${
        post.reportingTime || "N/A"
      }</strong></span>
                                        </div>
                                    </div>
                                    <div class="details-section">
                                        <div class="detail-item">
                                            <span class="label">Material:</span>
                                            <span class="value">${
                                              post.material || "N/A"
                                            }</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="label">Load Weight:</span>
                                            <span class="value">${
                                              post.loadWeight
                                                ? post.loadWeight + " MT"
                                                : "N/A"
                                            }</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="label">Truck Type:</span>
                                            <span class="value">${
                                              post.truckType || "N/A"
                                            }</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="label">Load Value:</span>
                                            <span class="value">₹${
                                              post.approxValue || "N/A"
                                            }</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="label">Payment:</span>
                                            <span class="value">${
                                              post.paymentTerms || "N/A"
                                            }</span>
                                        </div>
                                    </div>
                                    <div class="bidding-section">
                                        <div class="bidding-header">
                                            <div class="bidding-time-info${
                                              post.biddingTimeSeconds <= 0
                                                ? " timeout"
                                                : ""
                                            }">
                                                <span>Bidding Time:</span> <span class="bidding-timer${
                                                  post.biddingTimeSeconds <= 0
                                                    ? " timeout"
                                                    : ""
                                                }" data-id="${
        post.id
      }" data-time-left="${
        post.biddingTimeSeconds
      }">${biddingTimeDisplay}</span> <span class="timer-left-text"${
        post.biddingTimeSeconds > 0 ? "" : ' style="display: none;"'
      }>Left</span>
                                              
                                            </div>
                                            <button class="extend-bid-time-button" data-id="${
                                                  post.id
                                                }" style="display: ${extendButtonDisplay};">
                                                    <span class="extend-text-full">+ Extend Bid Time</span>
                                                </button>
                                        </div>
                                        <div class="bidding-table-container">
                                            <div class="bids-table">
                                                ${bidsHtml}
                                            </div>
                                        </div>
                                        <div class="bidding-summary-row">
                                            <span>Total Bid(s): ${totalBidsCount}</span>
                                            <button class="view-all-bids" data-id="${
                                              post.id
                                            }" style="display: ${
        totalBidsCount > 0 ? "block" : "none"
      };">View All</button>
                                        </div>
                                        <div class="bid-actions">
                                            <span>Req. Trucks<br><strong>${
                                              post.requiredTrucks || "N/A"
                                            }</strong></span>
                                            <span>Assign Trucks<br><strong>0</strong></span>
                                            <span>Balance Trucks<br><strong>${
                                              post.requiredTrucks || "N/A"
                                            }</strong></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="description-section">
                                    <span class="description-label">Description:</span> <span class="description-text">${
                                      post.description || "N/A"
                                    }</span>
                                </div>
                            </div>
                        </div>
                    `;
      loadPostsList.insertAdjacentHTML("beforeend", cardHtml);
    });
    
    // Update timer colors after rendering posts
    setTimeout(updateBiddingTimerColors, 100);
  }
  } catch (error) {
    console.error("Error in renderLoadPosts:", error);
  }
}

// Helper to format date for input type="date"
function formatDateForInput(dateString) {
  if (!dateString || dateString === "N/A") return "";
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

// Function to open modal and pre-fill data for editing
function openEditModal(postId) {
  const postToEdit = loadPosts.find((post) => post.postId == postId);
  if (!postToEdit) return;

  modalTitle.textContent = "Edit Load Request";
  createLoadRequestButton.textContent = "Update";
  createLoadRequestButton.dataset.mode = "update";
  currentEditPostId = postId;

  // Fill form fields
  document.getElementById("scheduleDate").value = formatDateForInput(
    postToEdit.scheduleDate
  );
  document.getElementById("reportingTime").value = postToEdit.reportingTime;
  document.getElementById("biddingHrs").value = postToEdit.biddingHrs; // Assuming biddingHrs is stored
  document.getElementById("biddingMins").value = postToEdit.biddingMins; // Assuming biddingMins is stored

  // Set active toggle buttons for Schedule Type and Load Post for
  scheduleTypeButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.scheduleType === postToEdit.scheduleType) {
      btn.classList.add("active");
    }
  });
  loadPostForButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.loadPostFor === postToEdit.loadPostFor) {
      btn.classList.add("active");
    }
  });
  updateScheduleTypeFields(postToEdit.scheduleType);
  updateLoadPostForFields(postToEdit.loadPostFor);

  // Fill other fields
  document.getElementById("loadingPoint").value = postToEdit.loadingPoint;
  document.getElementById("unloadingPoint").value = postToEdit.unloadingPoint;
  document.getElementById("material").value = postToEdit.material;
  document.getElementById("loadWeight").value = postToEdit.loadWeight;
  document.getElementById("approxValue").value = postToEdit.approxValue;
  document.getElementById("truckType").value = postToEdit.truckType;
  document.getElementById("requiredTrucks").value = postToEdit.requiredTrucks;
  document.getElementById("paymentTerms").value = postToEdit.paymentTerms;
  document.getElementById("specifyPaymentTerms").value =
    postToEdit.specifyPaymentTerms || "";
  document.getElementById("description").value = postToEdit.description;

  // Handle conditional fields like specifyPaymentTerms or Multiple Stops
  if (postToEdit.paymentTerms === "other") {
    conditionalPaymentTerms.style.display = "flex";
  } else {
    conditionalPaymentTerms.style.display = "none";
  }

  // For Multiple Stops, you'd need to dynamically add rows and populate them
  // This is more complex and will be handled in a later iteration if needed.
  // For now, it will just show the initial one-stop fields based on scheduleType.

  modalOverlay.style.display = "flex";
  document.body.classList.add("modal-open");
}

// Event listener for global Post a Load button in header
const headerPostLoadBtn = document.querySelector(".post-load-button");
if (headerPostLoadBtn) {
  headerPostLoadBtn.addEventListener("click", () => {
    console.log("Header Post a Load button clicked");
    // Reset modal for new post
    modalTitle.textContent = "Create Load Request";
    createLoadRequestButton.textContent = "Create";
    createLoadRequestButton.dataset.mode = "create";
    currentEditPostId = null; // Clear edit ID
  // Clear form fields (implement a clearForm function if many fields)
  document.getElementById("scheduleDate").value = "";
  document.getElementById("reportingTime").value = "";
  document.getElementById("biddingHrs").value = "";
  document.getElementById("biddingMins").value = "";
  document.getElementById("loadingPoint").value = "";
  document.getElementById("unloadingPoint").value = "";
  document.getElementById("material").value = "";
  document.getElementById("loadWeight").value = "";
  document.getElementById("approxValue").value = "";
  document.getElementById("truckType").value = "";
  document.getElementById("requiredTrucks").value = "";
  document.getElementById("paymentTerms").value = "";
  document.getElementById("specifyPaymentTerms").value = "";
  document.getElementById("description").value = "";

  // Reset toggle buttons to default 'One Stop' and 'My Transporters'
  scheduleTypeButtons.forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector('[data-schedule-type="One Stop"]')
    .classList.add("active");
  loadPostForButtons.forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector('[data-load-post-for="My Transporters"]')
    .classList.add("active");
  updateScheduleTypeFields("One Stop");
  updateLoadPostForFields("My Transporters");
  conditionalPaymentTerms.style.display = "none";

  modalOverlay.style.display = "flex";
  document.body.classList.add("modal-open");
});
} else {
  console.error("Header Post a Load button not found!");
}

// Dynamic form elements (already existing)
const scheduleTypeButtons = document.querySelectorAll(
  ".form-section:nth-of-type(1) .toggle-buttons button"
);
const loadPostForButtons = document.querySelectorAll(
  ".form-section:nth-of-type(2) .toggle-buttons button"
);
const oneStopFields = document.querySelectorAll(".one-stop-fields");
const bulkLoadFields = document.querySelector(".bulk-load-fields");
const multipleStopsFields = document.querySelector(".multiple-stops-fields");
const paymentTermsSelect = document.getElementById("paymentTerms");
const conditionalPaymentTerms = document.querySelector(
  ".conditional-payment-terms"
);
const addMoreAddressButton = document.querySelector(".add-more-address-button");
const loadingPointsContainer = document.querySelector(
  ".loading-points-container"
);

function updateScheduleTypeFields(selectedType) {
  oneStopFields.forEach((field) => (field.style.display = "none"));
  bulkLoadFields.style.display = "none";
  multipleStopsFields.style.display = "none";

  if (selectedType === "One Stop") {
    oneStopFields.forEach((field) => (field.style.display = "flex"));
  } else if (selectedType === "Bulk Load") {
    bulkLoadFields.style.display = "flex";
    oneStopFields.forEach((field) => (field.style.display = "flex"));
  } else if (selectedType === "Multiple Stops") {
    multipleStopsFields.style.display = "block";
  }
}

function updateLoadPostForFields(selectedType) {
  if (selectedType === "Transporter Groups") {
    bulkLoadFields.style.display = "flex";
  } else {
    bulkLoadFields.style.display = "none";
  }
}

// Event Listeners for Schedule Type
scheduleTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scheduleTypeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    updateScheduleTypeFields(button.dataset.scheduleType); // Use dataset for type
  });
});

// Event Listeners for Load Post for
loadPostForButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loadPostForButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    updateLoadPostForFields(button.dataset.loadPostFor); // Use dataset for type
  });
});

// Event Listener for Payment Terms
paymentTermsSelect.addEventListener("change", () => {
  if (paymentTermsSelect.value === "other") {
    conditionalPaymentTerms.style.display = "flex";
  } else {
    conditionalPaymentTerms.style.display = "none";
  }
});

// Initial state setup for modal dynamic fields
// Use setTimeout to ensure all elements are rendered before accessing them
setTimeout(() => {
  updateScheduleTypeFields(
    document.querySelector(
      ".form-section:nth-of-type(1) .toggle-buttons .active"
    ).dataset.scheduleType
  );
  updateLoadPostForFields(
    document.querySelector(
      ".form-section:nth-of-type(2) .toggle-buttons .active"
    ).dataset.loadPostFor
  );
}, 0);

// Add more Address functionality
let addressCount = 1;
addMoreAddressButton.addEventListener("click", () => {
  addressCount++;
  const newAddressRow = `
                <div class="form-group">
                    <label for="loadingPointMulti${addressCount}">Loading Point (From)</label>
                    <input type="text" id="loadingPointMulti${addressCount}" placeholder="Enter pickup Location">
                </div>
                <div class="form-group">
                    <label for="weightLoading${addressCount}">Weight (in MT)</label>
                    <input type="text" id="weightLoading${addressCount}" placeholder="Weight">
                </div>
                <div class="form-group">
                    <label for="unloadingPointMulti${addressCount}">Unloading Point (To)</label>
                    <input type="text" id="unloadingPointMulti${addressCount}" placeholder="Enter Drop Location">
                </div>
                <div class="form-group">
                    <label for="weightUnloading${addressCount}">Weight (in MT)</label>
                    <input type="text" id="weightUnloading${addressCount}" placeholder="Weight">
                </div>
                <div class="remove-more-icon">
                    <span class="remove-button">&#x2716;</span>
                </div>
            `;
  const newFormRow = document.createElement("div");
  newFormRow.classList.add("form-row", "loading-points-container");
  newFormRow.innerHTML = newAddressRow;
  loadingPointsContainer.parentNode.insertBefore(
    newFormRow,
    addMoreAddressButton.nextSibling
  );

  // Add event listener to new remove button
  newFormRow.querySelector(".remove-button").addEventListener("click", (e) => {
    e.target.closest(".form-row").remove();
  });
});

if (createLoadPostBtn) {
  createLoadPostBtn.addEventListener("click", () => {
    console.log("Create Load Post button clicked");
    if (modalOverlay) {
      modalOverlay.style.display = "flex";
      document.body.classList.add("modal-open");
    } else {
      console.error("modalOverlay not found");
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    console.log("Close modal button clicked");
    if (modalOverlay) {
      modalOverlay.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });
}

if (cancelModalBtn) {
  cancelModalBtn.addEventListener("click", () => {
    console.log("Cancel modal button clicked");
    if (modalOverlay) {
      modalOverlay.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });
}

// Close modal if clicked outside the content
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

// Handle Create Load Request button click
createLoadRequestButton.addEventListener("click", () => {
  console.log("Capturing form data...");
  
  // Debug virtual selects first
  if (window.debugVirtualSelects) {
    window.debugVirtualSelects();
  }
  
  const scheduleDate = document.getElementById("scheduleDate").value;
  const reportingTime = document.getElementById("reportingTime").value;
  const biddingHrs = document.getElementById("biddingHrs").value;
  const biddingMins = document.getElementById("biddingMins").value;
  const scheduleType = document.querySelector(
    ".form-section:nth-of-type(1) .toggle-buttons button.active"
  ).dataset.scheduleType;
  const loadPostFor = document.querySelector(
    ".form-section:nth-of-type(2) .toggle-buttons button.active"
  ).dataset.loadPostFor;
  const loadingPoint = document.getElementById("loadingPoint").value;
  const unloadingPoint = document.getElementById("unloadingPoint").value;
  const material = document.getElementById("material").value;
  const loadWeight = document.getElementById("loadWeight").value;
  const approxValue = document.getElementById("approxValue").value;
  const truckType = document.getElementById("truckType").value;
  const requiredTrucks = document.getElementById("requiredTrucks").value;
  const paymentTerms = document.getElementById("paymentTerms").value;
  const specifyPaymentTerms =
    paymentTerms === "other"
      ? document.getElementById("specifyPaymentTerms").value
      : "";
  const description = document.getElementById("description").value;

  console.log("Form data captured:", {
    scheduleDate,
    reportingTime,
    biddingHrs,
    biddingMins,
    scheduleType,
    loadPostFor,
    loadingPoint,
    unloadingPoint,
    material,
    loadWeight,
    approxValue,
    truckType,
    requiredTrucks,
    paymentTerms,
    specifyPaymentTerms,
    description,
  });

  const currentMode = createLoadRequestButton.dataset.mode;

  try {
    // For Multiple Stops, collect all points
    const multipleStopsLocations = [];
    if (scheduleType === "Multiple Stops") {
      document
        .querySelectorAll(".loading-points-container")
        .forEach((row, index) => {
          const loadPt = row.querySelector(
            `#loadingPointMulti${index + 1}`
          ).value;
          const weightLoad = row.querySelector(
            `#weightLoading${index + 1}`
          ).value;
          const unloadPt = row.querySelector(
            `#unloadingPointMulti${index + 1}`
          ).value;
          const weightUnload = row.querySelector(
            `#weightUnloading${index + 1}`
          ).value;
          multipleStopsLocations.push({
            loadingPoint: loadPt,
            weightLoading: weightLoad,
            unloadingPoint: unloadPt,
            weightUnloading: weightUnload,
          });
        });
    }

  const newLoadPostData = {
    id: currentMode === "create" ? Date.now() : currentEditPostId, // Use existing ID for update
    postedOn: new Date().toLocaleDateString("en-GB"),
    loadPostFor: loadPostFor || "N/A",
    postId: `LS${Math.floor(10000 + Math.random() * 90000)}`, // Generate new ID on create only
    scheduleType: scheduleType || "N/A",
    loadingPoint: loadingPoint || "N/A",
    unloadingPoint: unloadingPoint || "N/A",
    distance: "242 km", // Placeholder for now
    scheduleDate: scheduleDate || "N/A",
    reportingTime: reportingTime || "N/A",
    biddingHrs: biddingHrs || "N/A",
    biddingMins: biddingMins || "N/A",
    material: material || "N/A",
    loadWeight: loadWeight || "N/A",
    truckType: truckType || "N/A",
    approxValue: approxValue || "N/A",
    paymentTerms:
      paymentTerms === "other" && specifyPaymentTerms
        ? specifyPaymentTerms
        : paymentTerms || "N/A",
    biddingTimeSeconds: 600, // Default to 10 minutes for timer
    requiredTrucks: requiredTrucks || "N/A",
    description: description || "N/A",
    multipleStopsLocations: multipleStopsLocations,
    status: "ongoing", // New posts are always ongoing
    bids: [], // New posts start with no bids
  };

  if (
    newLoadPostData.scheduleType === "Multiple Stops" &&
    newLoadPostData.multipleStopsLocations.length > 0
  ) {
    newLoadPostData.loadingPoint =
      newLoadPostData.multipleStopsLocations[0].loadingPoint || "N/A";
    newLoadPostData.unloadingPoint =
      newLoadPostData.multipleStopsLocations[
        newLoadPostData.multipleStopsLocations.length - 1
      ].unloadingPoint || "N/A";
    newLoadPostData.distance = `+ ${
      newLoadPostData.multipleStopsLocations.length - 1
    } locations`;
  }

  if (currentMode === "create") {
    loadPosts.unshift(newLoadPostData);
  } else if (currentMode === "update") {
    const index = loadPosts.findIndex((post) => post.id == currentEditPostId);
    if (index !== -1) {
      loadPosts[index] = { ...loadPosts[index], ...newLoadPostData };
    }
  }

    renderLoadPosts();
    modalOverlay.style.display = "none";
    document.body.classList.remove("modal-open");
  } catch (error) {
    console.error("Error creating/updating load post:", error);
    alert("Error creating load post. Please check the console for details.");
  }
});

// Handle card action clicks (Edit, Delete, Fulfil, Refresh)
loadPostsList.addEventListener("click", (e) => {
  const targetButton = e.target.closest(".action-button");
  if (targetButton) {
    const action = targetButton.dataset.action;
    const id = targetButton.dataset.id;
    console.log(`Action: ${action}, ID: ${id}`);

    if (action === "delete") {
      currentDeletingPostId = id;
      const postToDelete = loadPosts.find((p) => p.postId == id);
      if (postToDelete) {
        deleteReviewDetailsBody.innerHTML = `
                            <div class="review-row">
                                <span>${postToDelete.postId || "N/A"}</span>
                                <span>${
                                  postToDelete.loadingPoint || "N/A"
                                }</span>
                                <span>${
                                  postToDelete.unloadingPoint || "N/A"
                                }</span>
                                <span>${postToDelete.distance || "N/A"}</span>
                                <span>${
                                  postToDelete.scheduleDate || "N/A"
                                }</span>
                                <span>${postToDelete.loadWeight || "N/A"}</span>
                                <span>${
                                  postToDelete.requiredTrucks || "N/A"
                                }</span>
                                <span>${postToDelete.material || "N/A"}</span>
                                <span>${postToDelete.truckType || "N/A"}</span>
                            </div>
                        `;
        deleteReasonTextarea.value = ""; // Clear previous reason
        confirmDeleteModalOverlay.style.display = "flex";
      }
    } else if (action === "fulfill") {
      currentFulfillingPostId = id;
      console.log("cuur id", id);
      const postToFulfill = loadPosts.find((p) => p.postId == id);
      if (postToFulfill) {
        fulfillReviewDetailsBody.innerHTML = `
                            <div class="review-row">
                                <span>${postToFulfill.postId || "N/A"}</span>
                                <span>${
                                  postToFulfill.loadingPoint || "N/A"
                                }</span>
                                <span>${
                                  postToFulfill.unloadingPoint || "N/A"
                                }</span>
                                <span>${postToFulfill.distance || "N/A"}</span>
                                <span>${
                                  postToFulfill.scheduleDate || "N/A"
                                }</span>
                                <span>${
                                  postToFulfill.loadWeight || "N/A"
                                }</span>
                                <span>${
                                  postToFulfill.requiredTrucks || "N/A"
                                }</span>
                                <span>${postToFulfill.material || "N/A"}</span>
                                <span>${postToFulfill.truckType || "N/A"}</span>
                            </div>
                        `;
        // Reset Managed By toggle to Loadsor (first button)
        managedByToggleButtons.forEach((btn) => btn.classList.remove("active"));
        if (managedByToggleButtons.length > 0) {
          managedByToggleButtons[0].classList.add("active"); // Set first button (Loadsor) as active
        }
        
        // Clear the input fields (fields are now always visible)
        transporterNameInput.value = "";
        mobileNumberInput.value = "";
        fulfillNotesTextarea.value = "";

        confirmFulfillModalOverlay.style.display = "flex";
      }
    } else if (action === "edit") {
      openEditModal(id);
    } else if (action === "refresh") {
      alert("Refreshing bids for this post.");
      renderLoadPosts(); // Re-render to simulate refresh
    } else if (action === "vehicle-details") {
      openVehicleDetailsModal(id);
    } else if (action === "upload-invoice") {
      openUploadInvoiceModal(id);
    }
  }
});

// Handle bidding actions (Accept Bid, Extend Bid Time, View All)
loadPostsList.addEventListener("click", (e) => {
  const targetButton = e.target.closest(
    ".accept-bid-button-inline, .extend-bid-time-button, .view-all-bids"
  );
  if (targetButton) {
    if (targetButton.classList.contains("accept-bid-button-inline")) {
      const postId = targetButton.dataset.id;
      const bidIndex = targetButton.dataset.bidIndex;
      const bidAmount = targetButton.dataset.amount;
      const post = loadPosts.find((p) => p.id == postId);
      const bid = post.bids[bidIndex];

      confirmationText.textContent = `Are you sure you want to accept the quotation of ${bidAmount}?`;
      acceptBidConfirmationModalOverlay.style.display = "flex";

      // Store the current bid context for confirmation
      currentAcceptingBid = { postId, bidIndex, bidAmount };
    } else if (targetButton.classList.contains("extend-bid-time-button")) {
      currentExtendingPostId = targetButton.dataset.id;
      // Open the extend bidding duration modal
      extendBidTimeModalOverlay.style.display = "flex";
      // Optionally pre-fill with current bidding time if needed
      // const postToExtend = loadPosts.find(p => p.id == currentExtendingPostId);
      // extendBiddingHrsSelect.value = postToExtend.biddingHrs;
      // extendBiddingMinsSelect.value = postToExtend.biddingMins;
    } else if (targetButton.classList.contains("view-all-bids")) {
      const postId = targetButton.dataset.id;
      const post = loadPosts.find((p) => p.id == postId);
      if (!post || !post.bids) return;

      viewAllBidsModalTitle.textContent = `Quotations Received for Load Post #${post.postId}`;
      viewAllBidsTableBody.innerHTML = ""; // Clear previous bids

      console.log("Opening View All Bids modal for post:", post.id);
      console.log("POST DISPLAY ID:", post.postId); // Show the user-facing post ID
      console.log("Post bid statuses:", post.bids.map(b => ({id: b.id, status: b.status, amount: b.amount})));
      console.log("Raw post object:", post);

      // Check if any bid is accepted in this post
      const isAnyBidAccepted = post.bids.some(
        (bid) => bid.status === "accepted"
      );
      
      console.log("Is any bid accepted:", isAnyBidAccepted);

      post.bids
        .filter((bid) => bid.amount)
        .forEach((bid) => {
          console.log("Rendering bid:", bid.id, "Status:", bid.status);
          console.log("Status check - accepted:", bid.status === "accepted", "rejected:", bid.status === "rejected");
          
          // Determine row class based on bid status
          let rowClass = "bid-full-row";
          if (bid.status === "accepted") {
            rowClass += " bid-row-accepted";
          } else if (bid.status === "rejected") {
            rowClass += " bid-row-rejected";
          }
          
          const bidRowHtml = `
                            <div class="${rowClass}">
                                <span>${bid.date || "N/A"}</span>
                                <span>${bid.company || "N/A"}</span>
                                <span>${bid.transporterName || "N/A"}</span>
                                <span>${bid.mobile || "N/A"}</span>
                                <span>${bid.loadWeight || "N/A"}</span>
                                <span>${bid.amount || "N/A"}</span>
                                <span>
                                    ${
                                      bid.status === "accepted"
                                        ? `<button class="bid-action-button accepted"><img src="./assets/check_icon.svg" alt="Accepted" />Accepted</button>`
                                        : bid.status === "rejected"
                                        ? `<button class="bid-action-button rejected" disabled> Rejected Bid</button>`
                                        : `<button class="bid-action-button" data-action="accept-full" data-post-id="${
                                            post.id
                                          }" data-bid-id="${
                                            bid.id
                                          }" data-amount="${bid.amount}" ${
                                            isAnyBidAccepted ? "disabled" : ""
                                          }>Accept Bid ➔</button>`
                                    }
                                </span>
                            </div>
                        `;
          viewAllBidsTableBody.insertAdjacentHTML("beforeend", bidRowHtml);
        });

      viewAllBidsModalOverlay.style.display = "flex";
    }
  }
});

// Handle accept bid buttons in View All Bids modal
console.log("Setting up viewAllBidsModalOverlay event listener, element:", viewAllBidsModalOverlay);

// Debug: Add document-level event listener to catch all clicks
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("bid-action-button")) {
    console.log("BID ACTION BUTTON CLICKED AT DOCUMENT LEVEL:", e.target);
    console.log("Button classes:", e.target.classList.toString());
    console.log("Button dataset:", e.target.dataset);
  }
});

viewAllBidsModalOverlay.addEventListener("click", (e) => {
  console.log("Click detected in View All Bids modal:", e.target);
  console.log("Target classes:", e.target.classList);
  console.log("Target dataset:", e.target.dataset);
  
  if (e.target.classList.contains("bid-action-button") && !e.target.disabled) {
    console.log("Bid action button clicked");
    
    const action = e.target.dataset.action;
    console.log("Action:", action);
    
    if (action === "accept-full") {
      const postId = e.target.dataset.postId;
      const bidId = e.target.dataset.bidId;
      const bidAmount = e.target.dataset.amount;
      
      console.log("Accept bid data:", { postId, bidId, bidAmount });
      
      // Find the post and bid
      const post = loadPosts.find((p) => p.id == postId);
      if (!post) {
        console.error("Post not found:", postId);
        return;
      }
      
      const bidIndex = post.bids.findIndex((bid) => bid.id == bidId);
      if (bidIndex === -1) {
        console.error("Bid not found:", bidId, "Available bid IDs:", post.bids.map(b => b.id));
        return;
      }
      
      console.log("Found bid at index:", bidIndex, "Bid details:", post.bids[bidIndex]);
      
      // Show confirmation modal
      if (confirmationText) {
        confirmationText.textContent = `Are you sure you want to accept the quotation of ${bidAmount}?`;
      }
      acceptBidConfirmationModalOverlay.style.display = "flex";
      
      // Store the current bid context for confirmation
      currentAcceptingBid = { postId, bidIndex, bidAmount };
      
      // Close the View All Bids modal
      viewAllBidsModalOverlay.style.display = "none";
    }
  }
});

// Confirmation Modal actions
cancelAcceptBidBtn.addEventListener("click", () => {
  acceptBidConfirmationModalOverlay.style.display = "none";
  currentAcceptingBid = null;
});

confirmAcceptBidBtn.addEventListener("click", () => {
  console.log("Confirm accept bid button clicked, currentAcceptingBid:", currentAcceptingBid);
  
  acceptBidConfirmationModalOverlay.style.display = "none";
  if (currentAcceptingBid) {
    const { postId, bidIndex, bidAmount } = currentAcceptingBid;
    console.log("Processing bid acceptance:", { postId, bidIndex, bidAmount });
    
    const postIndex = loadPosts.findIndex((p) => p.id == postId);

    if (postIndex !== -1) {
      console.log("Found post at index:", postIndex);
      console.log("Before update - Bid status:", loadPosts[postIndex].bids[bidIndex].status);
      
      loadPosts[postIndex].bids[bidIndex].status = "accepted";
      loadPosts[postIndex].bids[bidIndex].amount = bidAmount; // Ensure amount is also stored as accepted

      console.log("After update - Bid status:", loadPosts[postIndex].bids[bidIndex].status);

      // Disable all other bids for this post once one is accepted
      loadPosts[postIndex].bids.forEach((bid, idx) => {
        if (idx !== parseInt(bidIndex, 10)) {
          console.log(`Marking bid ${idx} as rejected:`, bid.id);
          bid.status = "rejected"; // Mark others as rejected
        }
      });

      loadPosts[postIndex].status = "accepted"; // Mark the post as accepted

      console.log("Final bid statuses:", loadPosts[postIndex].bids.map(b => ({id: b.id, status: b.status})));
      console.log("Bid marked as accepted, rendering posts...");
      renderLoadPosts();

      if (successMessage) {
        successMessage.textContent = `Bid L${
          parseInt(bidIndex, 10) + 1
        } has been accepted successfully!`;
      }
      if (acceptBidSuccessModalOverlay) {
        acceptBidSuccessModalOverlay.style.display = "flex";
        
        // Auto-close the success modal after 3 seconds
        setTimeout(() => {
          acceptBidSuccessModalOverlay.style.display = "none";
        }, 3000);
      }
      console.log("Bid acceptance process completed successfully");
    } else {
      console.error("Post not found for acceptance");
    }
  }
  currentAcceptingBid = null;
});

// Success Modal close on click outside
if (acceptBidSuccessModalOverlay) {
  acceptBidSuccessModalOverlay.addEventListener("click", (e) => {
    if (e.target === acceptBidSuccessModalOverlay) {
      acceptBidSuccessModalOverlay.style.display = "none";
    }
  });
}

// View All Bids Modal close action
closeViewAllBidsModalBtn.addEventListener("click", () => {
  viewAllBidsModalOverlay.style.display = "none";
});

// Extend Bidding Duration Modal actions
closeExtendBidTimeModalBtn.addEventListener("click", () => {
  extendBidTimeModalOverlay.style.display = "none";
  currentExtendingPostId = null;
});

cancelExtendBidTimeBtn.addEventListener("click", () => {
  extendBidTimeModalOverlay.style.display = "none";
  currentExtendingPostId = null;
});

confirmExtendBidTimeBtn.addEventListener("click", () => {
  extendBidTimeModalOverlay.style.display = "none";
  if (currentExtendingPostId) {
    const hours = parseInt(extendBiddingHrsSelect.value, 10);
    const minutes = parseInt(extendBiddingMinsSelect.value, 10);
    const newBiddingSeconds = hours * 3600 + minutes * 60;

    const postIndex = loadPosts.findIndex(
      (p) => p.id == currentExtendingPostId
    );
    if (postIndex !== -1) {
      loadPosts[postIndex].biddingTimeSeconds = newBiddingSeconds;
      renderLoadPosts();
    }
  }
  currentExtendingPostId = null;
});

// Confirm Delete Modal actions
closeDeleteModalBtn.addEventListener("click", () => {
  confirmDeleteModalOverlay.style.display = "none";
  currentDeletingPostId = null;
});

cancelDeleteBtn.addEventListener("click", () => {
  confirmDeleteModalOverlay.style.display = "none";
  currentDeletingPostId = null;
});

confirmDeleteBtn.addEventListener("click", () => {
  console.log("Delete button clicked, currentDeletingPostId:", currentDeletingPostId);
  confirmDeleteModalOverlay.style.display = "none";
  if (currentDeletingPostId) {
    // Find and remove the post using postId (not internal id)
    const postIndex = loadPosts.findIndex((post) => post.postId == currentDeletingPostId);
    if (postIndex !== -1) {
      console.log("Deleting post at index:", postIndex, "Post ID:", currentDeletingPostId);
      loadPosts.splice(postIndex, 1);
      renderLoadPosts();
      alert("Load post deleted successfully!"); // Consider a custom success modal here too
    } else {
      console.error("Post not found for deletion:", currentDeletingPostId);
    }
  }
  currentDeletingPostId = null;
});

// Confirm Fulfill Modal actions
closeFulfillModalBtn.addEventListener("click", () => {
  confirmFulfillModalOverlay.style.display = "none";
  currentFulfillingPostId = null;
});

cancelFulfillBtn.addEventListener("click", () => {
  confirmFulfillModalOverlay.style.display = "none";
  currentFulfillingPostId = null;
});

// Managed By toggle for Fulfill Modal
managedByToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    managedByToggleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    
    // Fields are now always visible, just clear them when switching to Loadsor
    if (button.dataset.value === "self") {
      // When Loadsor is selected, optionally clear fields or pre-fill with defaults
      transporterNameInput.value = "";
      mobileNumberInput.value = "";
    }
    // For "other" option, keep the fields as they are
  });
});

confirmFulfillBtn.addEventListener("click", () => {
  confirmFulfillModalOverlay.style.display = "none";
  if (currentFulfillingPostId) {
    // For now, just an alert, later update post status and move to Accepted tab
    alert("Load post fulfilled! (This card would now move to Accepted Bids)");
    // You would typically update the post's status here and re-render
    // const postIndex = loadPosts.findIndex(p => p.id == currentFulfillingPostId);
    // if (postIndex !== -1) {
    //     loadPosts[postIndex].status = 'fulfilled'; // Or 'accepted' to match tab
    //     renderLoadPosts();
    // }
  }
  currentFulfillingPostId = null;
});

// Tab Navigation Logic
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeTab = button.dataset.tab;
    renderLoadPosts();
  });
});

// Bidding Timer Logic
let timers = {}; // Store interval IDs

// Timer Background Color Functionality
// Add this code to your existing JavaScript section in the HTML file

// Update the existing startTimer function with background color changes
function startTimer(cardElement, initialSeconds) {
  const timerSpan = cardElement.querySelector(".bidding-timer");
  const biddingHeader = cardElement.querySelector(".bidding-header");
  const extendButton = cardElement.querySelector(".extend-bid-time-button");
  let totalSeconds = initialSeconds;
  const originalSeconds = initialSeconds; // Store original time for percentage calculation

  function updateTimer() {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    // Calculate percentage of time remaining
    const percentageRemaining = (totalSeconds / originalSeconds) * 100;

    // Update background color based on time remaining
    if (totalSeconds <= 0) {
      // Timeout state
      clearInterval(timers[cardElement.dataset.id]);
      timerSpan.textContent = "Timeout";
      timerSpan.classList.add("timeout-text");
      biddingHeader.classList.remove("warning");
      biddingHeader.classList.add("timeout");

      if (extendButton) extendButton.style.display = "block";
      cardElement
        .querySelectorAll(".accept-bid-button-inline")
        .forEach((btn) => (btn.style.display = "none"));
    } else if (percentageRemaining <= 10) {
      // Warning state (10% or less time remaining)
      timerSpan.textContent = `${hours}h : ${minutes}m : ${seconds}s`;
      biddingHeader.classList.add("warning");
      biddingHeader.classList.remove("timeout");
      timerSpan.classList.remove("timeout-text");

      if (extendButton) extendButton.style.display = "none";
      cardElement
        .querySelectorAll(".accept-bid-button-inline")
        .forEach((btn) => {
          const bidIndex = btn.dataset.bidIndex;
          const postId = btn.dataset.id;
          const post = loadPosts.find((p) => p.id == postId);
          if (
            post &&
            post.bids &&
            post.bids[bidIndex] &&
            post.bids[bidIndex].amount
          ) {
            const isAccepted = post.bids.some((b) => b.status === "accepted");
            btn.style.display = isAccepted ? "none" : "inline-block";
          } else {
            btn.style.display = "none";
          }
        });
      totalSeconds--;
    } else {
      // Normal state (more than 10% time remaining)
      timerSpan.textContent = `${hours}h : ${minutes}m : ${seconds}s`;
      biddingHeader.classList.remove("warning", "timeout");
      timerSpan.classList.remove("timeout-text");

      if (extendButton) extendButton.style.display = "none";
      cardElement
        .querySelectorAll(".accept-bid-button-inline")
        .forEach((btn) => {
          const bidIndex = btn.dataset.bidIndex;
          const postId = btn.dataset.id;
          const post = loadPosts.find((p) => p.id == postId);
          if (
            post &&
            post.bids &&
            post.bids[bidIndex] &&
            post.bids[bidIndex].amount
          ) {
            const isAccepted = post.bids.some((b) => b.status === "accepted");
            btn.style.display = isAccepted ? "none" : "inline-block";
          } else {
            btn.style.display = "none";
          }
        });
      totalSeconds--;
    }
  }

  updateTimer(); // Initial call to display immediately
  timers[cardElement.dataset.id] = setInterval(updateTimer, 1000);
}

// Call startTimer for each card after rendering
function initializeTimers() {
  for (const id in timers) {
    clearInterval(timers[id]);
  }
  timers = {};

  document.querySelectorAll(".load-post-card").forEach((card) => {
    const timeLeftSpan = card.querySelector(".bidding-timer");
    if (timeLeftSpan && timeLeftSpan.dataset.timeLeft) {
      const initialSeconds = parseInt(timeLeftSpan.dataset.timeLeft, 10);
      startTimer(card, initialSeconds);
    }
  });
}

// Initialize timers and start color updates
startBiddingTimers();

// Update colors frequently for smooth animation
setInterval(updateBiddingTimerColors); // Update colors every 250ms for smoother performance

// Initial color update
setTimeout(updateBiddingTimerColors, 100);

// Override renderLoadPosts to also initialize timers after rendering
const originalRenderLoadPosts = renderLoadPosts;
renderLoadPosts = function () {
  originalRenderLoadPosts();
  initializeTimers();
  initializeLocationTooltips();
};

// Function to initialize location tooltips
function initializeLocationTooltips() {
  // Remove any existing event listeners by cloning and replacing
  const locationTexts = document.querySelectorAll('.multiple-locations-text');
  
  locationTexts.forEach((locationText) => {
    const postId = locationText.dataset.postId;
    const tooltip = document.getElementById(`tooltip-${postId}`);
    
    if (tooltip) {
      // Show tooltip on hover
      locationText.addEventListener('mouseenter', function(e) {
        const rect = locationText.getBoundingClientRect();
        tooltip.style.display = 'block';
        
        // Position tooltip to the right of the text
        tooltip.style.left = (rect.width + 10) + 'px';
        tooltip.style.top = '0px';
      });
      
      // Hide tooltip on mouse leave
      locationText.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
      });
      
      // Keep tooltip visible when hovering over it
      tooltip.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
      });
      
      tooltip.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
      });
    }
  });
}

// Initial call to renderLoadPosts to setup the empty state or any initial data
console.log("Initial script.js load, calling renderLoadPosts...");
try {
  renderLoadPosts();
} catch (error) {
  console.error("Error in initial renderLoadPosts call:", error);
}

// More Dropdown elements
const moreIcon = document.getElementById("moreIcon");
const moreDropdown = document.getElementById("moreDropdown");

// Profile Dropdown Toggle
const profileIcon = document.getElementById("userProfile");
const profileDropdown = document.getElementById("profileDropdown");

profileIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = profileDropdown.style.display === "flex";
  profileDropdown.style.display = isOpen ? "none" : "flex";
  profileIcon.classList.toggle("active", !isOpen);
  notificationModalOverlay.style.display = "none"; // Close other modals
  moreDropdown.style.display = "none"; // Close other dropdowns
});

moreIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = moreDropdown.style.display === "flex";
  moreDropdown.style.display = isOpen ? "none" : "flex";
  moreIcon.classList.toggle("active", !isOpen);
  profileDropdown.style.display = "none";
  notificationModalOverlay.style.display = "none";
});

// Bell Icon Notification Modal Toggle
const bellIcon = document.getElementById("bellIcon");
bellIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  notificationModalOverlay.style.display =
    notificationModalOverlay.style.display === "flex" ? "none" : "flex";
  profileDropdown.style.display = "none"; // Close other dropdowns
  moreDropdown.style.display = "none";
});

closeNotificationModalBtn.addEventListener("click", () => {
  notificationModalOverlay.style.display = "none";
});

// Filter Modal event listeners
if (filterModalToggle) {
  filterModalToggle.addEventListener("click", () => {
    filterModalOverlay.style.display = "flex";
  });
}

if (filterModalClose) {
  filterModalClose.addEventListener("click", () => {
    filterModalOverlay.style.display = "none";
  });
}

if (filterModalOverlay) {
  filterModalOverlay.addEventListener("click", (e) => {
    if (e.target === filterModalOverlay) {
      filterModalOverlay.style.display = "none";
    }
  });
}

// Simplified Date Range Picker Functionality
const dateRangeInput = document.getElementById('modalFilterDateRange');
const hiddenDatePicker = document.getElementById('hiddenDatePicker');
const calendarIcon = document.querySelector('.date-range-calendar-icon');

let dateRangeState = {
  fromDate: '',
  toDate: '',
  isSelectingFrom: true // Start by selecting "From" date
};

// Format date to DD-MM-YYYY format
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Update the display input with the current date range
function updateDateRangeDisplay() {
  if (dateRangeState.fromDate && dateRangeState.toDate) {
    const fromFormatted = formatDate(dateRangeState.fromDate);
    const toFormatted = formatDate(dateRangeState.toDate);
    dateRangeInput.value = `${fromFormatted} - ${toFormatted}`;
  } else if (dateRangeState.fromDate) {
    const fromFormatted = formatDate(dateRangeState.fromDate);
    dateRangeInput.value = `${fromFormatted} - `;
  } else {
    dateRangeInput.value = '';
  }
}

// Handle calendar icon click
if (calendarIcon && hiddenDatePicker) {
  calendarIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset the hidden picker value first
    hiddenDatePicker.value = '';
    
    // Small delay to ensure the reset takes effect
    setTimeout(() => {
      // Focus and trigger click on the hidden date input
      hiddenDatePicker.focus();
      
      // For modern browsers that support showPicker
      if (hiddenDatePicker.showPicker) {
        try {
          hiddenDatePicker.showPicker();
        } catch (error) {
          // Fallback to click if showPicker fails
          hiddenDatePicker.click();
        }
      } else {
        // Fallback for older browsers
        hiddenDatePicker.click();
      }
    }, 50);
  });

  // Handle date selection
  hiddenDatePicker.addEventListener('change', () => {
    const selectedDate = hiddenDatePicker.value;
    
    if (selectedDate) {
      if (dateRangeState.isSelectingFrom) {
        // First click - set "From" date
        dateRangeState.fromDate = selectedDate;
        dateRangeState.isSelectingFrom = false;
      } else {
        // Second click - set "To" date
        dateRangeState.toDate = selectedDate;
        dateRangeState.isSelectingFrom = true; // Reset for next selection
      }
      
      updateDateRangeDisplay();
      
      // Clear the hidden picker after a short delay to allow the calendar to close properly
      setTimeout(() => {
        hiddenDatePicker.value = '';
      }, 500);
    }
  });
}

// Handle input click to also trigger date picker
if (dateRangeInput && hiddenDatePicker) {
  dateRangeInput.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset the hidden picker value first
    hiddenDatePicker.value = '';
    
    // Small delay to ensure the reset takes effect
    setTimeout(() => {
      // Focus and trigger click on the hidden date input
      hiddenDatePicker.focus();
      
      // For modern browsers that support showPicker
      if (hiddenDatePicker.showPicker) {
        try {
          hiddenDatePicker.showPicker();
        } catch (error) {
          // Fallback to click if showPicker fails
          hiddenDatePicker.click();
        }
      } else {
        // Fallback for older browsers
        hiddenDatePicker.click();
      }
    }, 50);
  });
}

// Add clear functionality when input is double-clicked
if (dateRangeInput) {
  dateRangeInput.addEventListener('dblclick', () => {
    dateRangeState.fromDate = '';
    dateRangeState.toDate = '';
    dateRangeState.isSelectingFrom = true;
    updateDateRangeDisplay();
  });
}

// Fix date range picker reset issue
if (hiddenDatePicker) {
  // Reset the date picker before each use
  hiddenDatePicker.addEventListener('input', (e) => {
    // Allow the input event to process normally
    setTimeout(() => {
      hiddenDatePicker.blur(); // Ensure picker closes after selection
    }, 100);
  });
}

// Post Date field calendar functionality
const postDateInput = document.getElementById('modalFilterPostDate');
const postDateCalendarIcons = document.querySelectorAll('#modalFilterPostDate + .date-range-calendar-icon');

if (postDateInput && postDateCalendarIcons.length > 0) {
  postDateCalendarIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Focus and trigger the date picker
      postDateInput.focus();
      
      // For modern browsers that support showPicker
      if (postDateInput.showPicker) {
        try {
          postDateInput.showPicker();
        } catch (error) {
          // Fallback to click if showPicker fails
          postDateInput.click();
        }
      } else {
        // Fallback for older browsers
        postDateInput.click();
      }
    });
  });
}

// Schedule Date field calendar functionality (Create Load Request modal)
const scheduleDateInput = document.getElementById('scheduleDate');
const scheduleDateCalendarIcon = document.querySelector('#scheduleDate + .date-range-calendar-icon');

if (scheduleDateInput && scheduleDateCalendarIcon) {
  scheduleDateCalendarIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Focus and trigger the date picker
    scheduleDateInput.focus();
    
    // For modern browsers that support showPicker
    if (scheduleDateInput.showPicker) {
      try {
        scheduleDateInput.showPicker();
      } catch (error) {
        // Fallback to click if showPicker fails
        scheduleDateInput.click();
      }
    } else {
      // Fallback for older browsers
      scheduleDateInput.click();
    }
  });
}

// Filter Sidebar Date Range Functionality
const sidebarDateRangeInput = document.getElementById('filterDateRange');
const sidebarHiddenDatePicker = document.getElementById('hiddenDatePickerSidebar');
const sidebarCalendarIcon = document.querySelector('.filter-sidebar .date-range-calendar-icon');

let sidebarDateRangeState = {
  fromDate: '',
  toDate: '',
  isSelectingFrom: true // Start by selecting "From" date
};

// Update the sidebar date range display
function updateSidebarDateRangeDisplay() {
  if (sidebarDateRangeState.fromDate && sidebarDateRangeState.toDate) {
    const fromFormatted = formatDate(sidebarDateRangeState.fromDate);
    const toFormatted = formatDate(sidebarDateRangeState.toDate);
    sidebarDateRangeInput.value = `${fromFormatted} - ${toFormatted}`;
  } else if (sidebarDateRangeState.fromDate) {
    const fromFormatted = formatDate(sidebarDateRangeState.fromDate);
    sidebarDateRangeInput.value = `${fromFormatted} - `;
  } else {
    sidebarDateRangeInput.value = '';
  }
}

// Handle sidebar calendar icon click
if (sidebarCalendarIcon && sidebarHiddenDatePicker) {
  sidebarCalendarIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset the hidden picker value first
    sidebarHiddenDatePicker.value = '';
    
    // Small delay to ensure the reset takes effect
    setTimeout(() => {
      // Focus and trigger click on the hidden date input
      sidebarHiddenDatePicker.focus();
      
      // For modern browsers that support showPicker
      if (sidebarHiddenDatePicker.showPicker) {
        try {
          sidebarHiddenDatePicker.showPicker();
        } catch (error) {
          // Fallback to click if showPicker fails
          sidebarHiddenDatePicker.click();
        }
      } else {
        // Fallback for older browsers
        sidebarHiddenDatePicker.click();
      }
    }, 50);
  });

  // Handle sidebar date selection
  sidebarHiddenDatePicker.addEventListener('change', () => {
    const selectedDate = sidebarHiddenDatePicker.value;
    
    if (selectedDate) {
      if (sidebarDateRangeState.isSelectingFrom) {
        // First click - set "From" date
        sidebarDateRangeState.fromDate = selectedDate;
        sidebarDateRangeState.isSelectingFrom = false;
      } else {
        // Second click - set "To" date
        sidebarDateRangeState.toDate = selectedDate;
        sidebarDateRangeState.isSelectingFrom = true; // Reset for next selection
      }
      
      updateSidebarDateRangeDisplay();
      
      // Clear the hidden picker after a short delay to allow the calendar to close properly
      setTimeout(() => {
        sidebarHiddenDatePicker.value = '';
      }, 500);
    }
  });
}

// Handle sidebar date range input click to also trigger date picker
if (sidebarDateRangeInput && sidebarHiddenDatePicker) {
  sidebarDateRangeInput.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset the hidden picker value first
    sidebarHiddenDatePicker.value = '';
    
    // Small delay to ensure the reset takes effect
    setTimeout(() => {
      // Focus and trigger click on the hidden date input
      sidebarHiddenDatePicker.focus();
      
      // For modern browsers that support showPicker
      if (sidebarHiddenDatePicker.showPicker) {
        try {
          sidebarHiddenDatePicker.showPicker();
        } catch (error) {
          // Fallback to click if showPicker fails
          sidebarHiddenDatePicker.click();
        }
      } else {
        // Fallback for older browsers
        sidebarHiddenDatePicker.click();
      }
    }, 50);
  });
}

// Filter Sidebar Post Date functionality
const sidebarPostDateInput = document.getElementById('filterPostDate');
const sidebarPostDateCalendarIcon = document.querySelector('.filter-sidebar .date-range-input-wrapper .date-range-calendar-icon');

if (sidebarPostDateInput && sidebarPostDateCalendarIcon) {
  sidebarPostDateCalendarIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Focus and trigger the date picker
    sidebarPostDateInput.focus();
    
    // For modern browsers that support showPicker
    if (sidebarPostDateInput.showPicker) {
      try {
        sidebarPostDateInput.showPicker();
      } catch (error) {
        // Fallback to click if showPicker fails
        sidebarPostDateInput.click();
      }
    } else {
      // Fallback for older browsers
      sidebarPostDateInput.click();
    }
  });
}

// Clear All functionality for filter modal
const filterClearBtn = document.querySelector('.filter-clear-btn');
if (filterClearBtn) {
  filterClearBtn.addEventListener('click', () => {
    // Clear all text inputs
    const textInputs = document.querySelectorAll('#filterModalOverlay input[type="text"]');
    textInputs.forEach(input => {
      input.value = '';
    });
    
    // Clear all date inputs
    const dateInputs = document.querySelectorAll('#filterModalOverlay input[type="date"]');
    dateInputs.forEach(input => {
      input.value = '';
    });
    
    // Reset all custom dropdowns
    const dropdownHeaders = document.querySelectorAll('#filterModalOverlay .dropdown-header');
    dropdownHeaders.forEach(header => {
      const selectedValue = header.querySelector('.selected-value');
      const dropdownList = header.closest('.custom-dropdown').querySelector('.dropdown-list');
      const firstItem = dropdownList.querySelector('.dropdown-item[data-value=""]') || 
                       dropdownList.querySelector('.dropdown-item:first-child');
      
      if (selectedValue && firstItem) {
        selectedValue.textContent = firstItem.textContent;
        header.closest('.custom-dropdown').setAttribute('data-value', firstItem.getAttribute('data-value') || '');
        
        // Remove selected class from all items
        dropdownList.querySelectorAll('.dropdown-item').forEach(item => {
          item.classList.remove('selected');
        });
        
        // Add selected class to first item
        firstItem.classList.add('selected');
      }
    });
    
    // Reset date range state
    dateRangeState.fromDate = '';
    dateRangeState.toDate = '';
    dateRangeState.isSelectingFrom = true;
    updateDateRangeDisplay();
    
    // Clear hidden date picker
    if (hiddenDatePicker) {
      hiddenDatePicker.value = '';
    }
    
    console.log('All filter fields cleared');
  });
}

// More Dropdown Toggle
// const moreLink = document.querySelector('nav ul li a[href="#"]:contains("More")');
// moreLink.addEventListener('click', (event) => {
//     event.stopPropagation();
//     moreDropdown.style.display = moreDropdown.style.display === 'flex' ? 'none' : 'flex';
//     profileDropdown.style.display = 'none'; // Close other dropdowns
//     notificationModalOverlay.style.display = 'none';
// });

// Close modals/dropdowns when clicking outside
document.addEventListener("click", (event) => {
  if (
    profileDropdown &&
    !profileDropdown.contains(event.target) &&
    profileIcon &&
    !profileIcon.contains(event.target)
  ) {
    profileDropdown.style.display = "none";
    profileIcon.classList.remove("active");
  }
  if (
    notificationModalOverlay &&
    !notificationModalOverlay.contains(event.target) &&
    bellIcon &&
    !bellIcon.contains(event.target)
  ) {
    notificationModalOverlay.style.display = "none";
  }
  if (
    filterModalOverlay &&
    filterModalOverlay.querySelector('.filter-modal') &&
    !filterModalOverlay.querySelector('.filter-modal').contains(event.target) &&
    filterModalToggle &&
    !filterModalToggle.contains(event.target)
  ) {
    filterModalOverlay.style.display = "none";
  }
  if (
    moreIcon &&
    !moreIcon.contains(event.target) &&
    // !moreLink.contains(event.target) &&
    moreDropdown &&
    !moreDropdown.contains(event.target)
  ) {
    moreDropdown.style.display = "none";
    moreIcon.classList.remove("active");
  }
});

// Check Challan Modal elements and toggle
const checkChallanLink = document.getElementById("checkChallanLink");
const checkChallanModal = document.getElementById("checkChallanModal");
const closeCheckChallanModalBtn = document.getElementById(
  "closeCheckChallanModal"
);
const viewAllChallansLink = document.querySelector(
  ".check-challan-modal .view-all-challans"
);

checkChallanLink.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default link behavior
  event.stopPropagation();
  checkChallanModal.style.display =
    checkChallanModal.style.display === "flex" ? "none" : "flex";
  profileDropdown.style.display = "none"; // Close other dropdowns
  notificationModalOverlay.style.display = "none";
  moreDropdown.style.display = "none";
});

closeCheckChallanModalBtn.addEventListener("click", () => {
  checkChallanModal.style.display = "none";
});

viewAllChallansLink.addEventListener("click", () => {
  checkChallanModal.style.display = "none";
  alert("Navigating to All Challans page...");
});

// Timer and color management system
function updateBiddingTimerColors() {
  const timers = document.querySelectorAll('.bidding-timer[data-time-left]');
  
  timers.forEach(timer => {
    const timeLeft = parseInt(timer.getAttribute('data-time-left'));
    const postId = timer.getAttribute('data-id');
    
    // Find the corresponding post to get original time
    const post = loadPosts.find(p => p.id == postId);
    if (!post) return;
    
    // Calculate original total time (convert string values to numbers)
    const hours = parseInt(post.biddingHrs) || 0;
    const minutes = parseInt(post.biddingMins) || 10; // Default to 10 minutes
    const originalTime = hours * 3600 + minutes * 60;
    
    // Get more precise time calculation including milliseconds
    const currentTime = Date.now();
    if (!timer.hasAttribute('data-last-update')) {
      timer.setAttribute('data-last-update', currentTime);
    }
    
    const lastUpdate = parseInt(timer.getAttribute('data-last-update'));
    const timeSinceLastUpdate = (currentTime - lastUpdate) / 1000; // seconds
    const preciseTimeLeft = Math.max(0, timeLeft - timeSinceLastUpdate);
    const percentageLeft = originalTime > 0 ? (preciseTimeLeft / originalTime) * 100 : 0;
    
    // Debug log for testing
    console.log(`Timer ${postId}: ${preciseTimeLeft.toFixed(1)}s left, ${percentageLeft.toFixed(1)}% remaining`);
    
    // Get the bidding header element
    const biddingHeader = timer.closest('.bidding-header');
    const biddingTimeInfo = timer.closest('.bidding-time-info');
    
    if (!biddingHeader) return;
    
    // Remove existing color classes
    biddingHeader.classList.remove('warning', 'timeout');
    timer.classList.remove('timeout-text');
    
    if (timeLeft <= 0) {
      // Timeout state - grey background, red text
      biddingHeader.classList.add('timeout');
      timer.classList.add('timeout-text');
      biddingHeader.style.background = '';
      biddingHeader.style.animation = 'none';
    } else {
      // Create horizontal progress bar effect from right to left
      let progressColor, backgroundColor;
      
      if (percentageLeft > 75) {
        // Pure green progress
        progressColor = '#EEFFE8'; // Original green
        backgroundColor = '#f8f9fa'; // Light grey background
      } else if (percentageLeft > 50) {
        // Green to yellow progress (75% to 50%)
        const intensity = (percentageLeft - 50) / 25; // 0 to 1
        const red = Math.round(238 + (255 - 238) * (1 - intensity));
        const green = 255;
        const blue = Math.round(232 + (200 - 232) * (1 - intensity));
        progressColor = `rgb(${red}, ${green}, ${blue})`;
        backgroundColor = '#f8f9fa';
      } else if (percentageLeft > 25) {
        // Yellow to orange progress (50% to 25%)
        const intensity = (percentageLeft - 25) / 25; // 0 to 1
        const red = 255;
        const green = Math.round(165 + (255 - 165) * intensity);
        const blue = Math.round(80 + (200 - 80) * intensity);
        progressColor = `rgb(${red}, ${green}, ${blue})`;
        backgroundColor = '#f8f9fa';
      } else {
        // Orange to red progress (25% to 0%)
        const intensity = percentageLeft / 25; // 0 to 1
        const red = 255;
        const green = Math.round(100 + (165 - 100) * intensity);
        const blue = Math.round(50 + (80 - 50) * intensity);
        progressColor = `rgb(${red}, ${green}, ${blue})`;
        backgroundColor = '#f8f9fa';
      }
      
      // Create horizontal gradient that decreases from left to right
      // Progress color fills from left and shrinks as time decreases
      const gradient = `linear-gradient(to right, ${progressColor} ${percentageLeft}%, ${backgroundColor} ${percentageLeft}%)`;
      
      // Apply the gradient background smoothly
      biddingHeader.style.background = gradient;
      console.log(`Applied gradient: ${gradient} to timer ${postId}`);
      
      // Remove pulsing animation to prevent blinking
      biddingHeader.style.animation = 'none';
    }
  });
}

// Countdown timer function
function startBiddingTimers() {
  setInterval(() => {
    const timers = document.querySelectorAll('.bidding-timer[data-time-left]');
    
    timers.forEach(timer => {
      let timeLeft = parseInt(timer.getAttribute('data-time-left'));
      
      if (timeLeft > 0) {
        timeLeft--;
        timer.setAttribute('data-time-left', timeLeft);
        timer.setAttribute('data-last-update', Date.now()); // Update timestamp for smooth animation
        
        // Update the display
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        const formattedTime = `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
        timer.textContent = formattedTime;
        
        // Show "Left" text when timer is active
        const leftText = timer.closest('.bidding-time-info').querySelector('.timer-left-text');
        if (leftText) {
          leftText.style.display = 'inline';
        }
        
        // Update the corresponding post data
        const postId = timer.getAttribute('data-id');
        const post = loadPosts.find(p => p.id == postId);
        if (post) {
          post.biddingTimeSeconds = timeLeft;
        }
        
        // Show/hide extend button based on timeout
        const extendButton = timer.closest('.bidding-time-info').querySelector('.extend-bid-time-button');
        if (extendButton) {
          extendButton.style.display = timeLeft <= 0 ? 'block' : 'none';
        }
      } else {
        // Time is up
        timer.textContent = 'Timeout';
        
        // Hide "Left" text when timer is timeout
        const leftText = timer.closest('.bidding-time-info').querySelector('.timer-left-text');
        if (leftText) {
          leftText.style.display = 'none';
        }
        
        // Show extend button
        const extendButton = timer.closest('.bidding-time-info').querySelector('.extend-bid-time-button');
        if (extendButton) {
          extendButton.style.display = 'block';
        }
      }
    });
    
    // Update colors after time updates
    updateBiddingTimerColors();
  }, 1000); // Update every second
}

// Initialize notification count on page load
updateNotificationCount();

// Test functions (for development only - can be removed in production)
window.testAddNotification = function() {
  addNotification("Test notification message", "1m", "🔔");
};

window.testClearNotifications = function() {
  clearAllNotifications();
};

// Truck Status Modal functionality
function openTruckStatusModal(postId, action) {
  currentTruckStatusContext.postId = postId;
  currentTruckStatusContext.action = action;
  
  // Set default dropdown value based on action
  const selectedValue = truckInOutHeader.querySelector('.selected-value');
  if (action === 'check-in') {
    selectedValue.textContent = 'IN';
    currentTruckStatusContext.selectedType = 'IN';
    // Hide records section for check-in
    truckStatusRecordsSection.style.display = 'none';
  } else {
    selectedValue.textContent = 'OUT';
    currentTruckStatusContext.selectedType = 'OUT';
    // Show records section for check-out
    truckStatusRecordsSection.style.display = 'block';
    // Load existing records for this post
    loadTruckStatusRecords(postId);
  }
  
  // Clear date input
  truckStatusDatePicker.value = '';
  
  // Show modal
  truckStatusModalOverlay.style.display = 'flex';
  
  // Attach date picker events after modal is shown
  setTimeout(() => {
    attachDatePickerEvents();
  }, 100);
}

// Vehicle Details Modal functionality
function openVehicleDetailsModal(postId) {
  const post = loadPosts.find(p => p.postId === postId);
  if (!post || !post.transporterDetails || !post.transporterDetails.vehicleDetails) {
    alert('Vehicle details not available for this post.');
    return;
  }
  
  const vehicleDetails = post.transporterDetails.vehicleDetails;
  
  // Populate modal with vehicle details
  document.getElementById('vehicleNumber').textContent = vehicleDetails.vehicleNumber;
  document.getElementById('vehicleStatus').textContent = vehicleDetails.vehicleStatus;
  document.getElementById('ownerName').textContent = vehicleDetails.ownerName;
  document.getElementById('registrationDate').textContent = vehicleDetails.registrationDate;
  document.getElementById('registeringAuthority').textContent = vehicleDetails.registeringAuthority;
  document.getElementById('fitnessValidUpto').textContent = vehicleDetails.fitnessValidUpto;
  document.getElementById('vehicleClass').textContent = vehicleDetails.vehicleClass;
  document.getElementById('taxValidUpto').textContent = vehicleDetails.taxValidUpto;
  document.getElementById('fuelType').textContent = vehicleDetails.fuelType;
  document.getElementById('insuranceValidUpto').textContent = vehicleDetails.insuranceValidUpto;
  document.getElementById('emissionNorm').textContent = vehicleDetails.emissionNorm;
  document.getElementById('puccValidUpto').textContent = vehicleDetails.puccValidUpto;
  document.getElementById('vehicleAge').textContent = vehicleDetails.vehicleAge;
  
  // Show modal
  vehicleDetailsModalOverlay.style.display = 'flex';
}

// Upload Invoice Modal functionality
function openUploadInvoiceModal(postId) {
  // Reset uploaded files
  uploadedFiles = {
    material: null,
    eway: null,
    other: null
  };
  
  // Reset all upload areas to placeholder state
  resetUploadArea('material');
  resetUploadArea('eway');
  resetUploadArea('other');
  
  // Show modal
  uploadInvoiceModalOverlay.style.display = 'flex';
  
  // Debug: Immediately check if elements exist
  console.log('Immediate check after modal shown:');
  console.log('otherFileInput:', document.getElementById('otherFileInput'));
  console.log('materialFileName:', document.getElementById('materialFileName'));
  console.log('materialFileInfoRow:', document.getElementById('materialFileInfoRow'));
  
  // Debug: Check if file-info-container exists
  const fileInfoContainer = document.querySelector('.file-info-container');
  console.log('file-info-container found:', fileInfoContainer);
  if (fileInfoContainer) {
    console.log('file-info-container children:', fileInfoContainer.children);
  }
  
  // Debug: Check all upload areas
  console.log('All upload areas:');
  console.log('materialInvoiceArea:', document.getElementById('materialInvoiceArea'));
  console.log('ewayBillArea:', document.getElementById('ewayBillArea'));
  console.log('otherDocsArea:', document.getElementById('otherDocsArea'));
  
  // Set up file upload functionality after modal is shown
  setTimeout(() => {
    console.log('Setting up file upload functionality...');
    console.log('Modal overlay display:', uploadInvoiceModalOverlay.style.display);
    console.log('Modal overlay:', uploadInvoiceModalOverlay);
    
    // Check if modal content is in DOM
    const modalContent = document.querySelector('.upload-invoice-modal-content');
    console.log('Modal content found:', modalContent);
    
    setupFileUpload('material');
    setupFileUpload('eway');
    setupFileUpload('other');
    
    // Set up remove button functionality
    setupRemoveButtons();
  }, 500);
}

function setupRemoveButtons() {
  console.log('Setting up remove buttons...');
  
  const materialRemoveBtn = document.getElementById('removeMaterialFile');
  const ewayRemoveBtn = document.getElementById('removeEwayFile');
  const otherRemoveBtn = document.getElementById('removeOtherFile');
  
  console.log('Remove buttons found:', { materialRemoveBtn, ewayRemoveBtn, otherRemoveBtn });
  
  if (materialRemoveBtn) {
    materialRemoveBtn.addEventListener('click', () => {
      removeFile('material');
      const fileInput = document.getElementById('materialFileInput');
      if (fileInput) fileInput.value = '';
    });
  }
  
  if (ewayRemoveBtn) {
    ewayRemoveBtn.addEventListener('click', () => {
      removeFile('eway');
      const fileInput = document.getElementById('ewayFileInput');
      if (fileInput) fileInput.value = '';
    });
  }
  
  if (otherRemoveBtn) {
    otherRemoveBtn.addEventListener('click', () => {
      removeFile('other');
      const fileInput = document.getElementById('otherFileInput');
      if (fileInput) fileInput.value = '';
    });
  }
}

function resetUploadArea(type) {
  const placeholder = document.getElementById(`${type}Placeholder`);
  const preview = document.getElementById(`${type}Preview`);
  const fileInfoRow = document.getElementById(`${type}FileInfoRow`);
  
  if (placeholder) {
    placeholder.style.display = 'flex';
  }
  if (preview) {
    preview.style.display = 'none';
  }
  if (fileInfoRow) {
    fileInfoRow.style.display = 'none';
  }
}

function showFilePreview(type, file) {
  console.log(`Showing file preview for type: ${type}, file: ${file.name}`);
  const placeholder = document.getElementById(`${type}Placeholder`);
  const preview = document.getElementById(`${type}Preview`);
  const previewImage = document.getElementById(`${type}PreviewImage`);
  const fileName = document.getElementById(`${type}FileName`);
  const fileInfoRow = document.getElementById(`${type}FileInfoRow`);
  
  console.log(`Elements found for ${type}:`, {
    placeholder,
    preview,
    previewImage,
    fileName,
    fileInfoRow
  });
  
  // Check if elements exist
  if (!placeholder || !preview || !previewImage || !fileName || !fileInfoRow) {
    console.error(`Upload preview elements not found for type: ${type}`);
    return;
  }
  
  // Hide placeholder and show preview
  placeholder.style.display = 'none';
  preview.style.display = 'flex';
  
  // Show file info row
  fileInfoRow.style.display = 'flex';
  
  // Set file name
  fileName.textContent = file.name;
  
  // Show preview based on file type
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  } else {
    // For non-image files, show a generic preview or document icon
    previewImage.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
  
  // Store the file
  uploadedFiles[type] = file;
}

function removeFile(type) {
  uploadedFiles[type] = null;
  resetUploadArea(type);
}

function loadTruckStatusRecords(postId) {
  const post = loadPosts.find(p => p.postId === postId);
  if (!post || !post.transporterDetails) {
    showEmptyState();
    return;
  }
  
  const records = [];
  
  // Add check-in record if exists
  if (post.transporterDetails.truckCheckIn) {
    records.push({
      vehicleNo: post.transporterDetails.vehicleNo || 'N/A',
      addedDate: new Date(post.transporterDetails.truckCheckIn).toLocaleString(),
      truckStatus: 'In',
      addedBy: 'System User'
    });
  }
  
  // Add check-out record if exists
  if (post.transporterDetails.truckCheckOut) {
    records.push({
      vehicleNo: post.transporterDetails.vehicleNo || 'N/A',
      addedDate: new Date(post.transporterDetails.truckCheckOut).toLocaleString(),
      truckStatus: 'Out',
      addedBy: 'System User'
    });
  }
  
  currentTruckStatusContext.records = records;
  renderTruckStatusRecords(records);
}

function renderTruckStatusRecords(records) {
  if (records.length === 0) {
    showEmptyState();
    return;
  }
  
  truckStatusEmptyState.style.display = 'none';
  const tbody = truckStatusTableBody;
  tbody.innerHTML = '';
  
  records.forEach(record => {
    const row = document.createElement('div');
    row.className = 'bid-full-row';
    row.innerHTML = `
      <span>${record.vehicleNo}</span>
      <span>${record.addedDate}</span>
      <span>${record.truckStatus}</span>
      <span>${record.addedBy}</span>
    `;
    tbody.appendChild(row);
  });
}

function showEmptyState() {
  truckStatusTableBody.innerHTML = '';
  truckStatusEmptyState.style.display = 'block';
}

function updateTruckStatus(postId, action, dateTime) {
  const post = loadPosts.find(p => p.postId === postId);
  if (!post) return;
  
  if (!post.transporterDetails) {
    post.transporterDetails = {};
  }
  
  // Update the post data
  if (action === 'check-in') {
    post.transporterDetails.truckCheckIn = dateTime;
  } else if (action === 'check-out') {
    post.transporterDetails.truckCheckOut = dateTime;
  }
  
  // Add record to truck status table
  addTruckStatusRecord(post, action, dateTime);
  
  // Re-render the posts to update the UI
  renderLoadPosts();
  
  // Close modal
  truckStatusModalOverlay.style.display = 'none';
}

function addTruckStatusRecord(post, action, dateTime) {
  const tbody = document.getElementById("truckStatusTableBody");
  const emptyState = document.getElementById("truckStatusEmptyState");
  const recordsSection = document.getElementById("truckStatusRecordsSection");
  
  // Show records section and hide empty state
  if (recordsSection) recordsSection.style.display = 'block';
  if (emptyState) emptyState.style.display = 'none';
  
  // Create new record row
  const recordRow = document.createElement('div');
  recordRow.className = 'bid-full-row';
  
  // Format the date for display
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + ' ' + date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Get vehicle number from post data
  const vehicleNo = post.transporterDetails?.vehicleNumber || 'N/A';
  
  // Determine status display - plain text like other values
  const statusDisplay = action === 'check-in' ? 'IN' : 'OUT';
  
  recordRow.innerHTML = `
    <span>${vehicleNo}</span>
    <span>${formattedDate}</span>
    <span>${statusDisplay}</span>
    <span>Admin</span>
  `;
  
  // Add to table (newest first)
  if (tbody.firstChild) {
    tbody.insertBefore(recordRow, tbody.firstChild);
  } else {
    tbody.appendChild(recordRow);
  }
}

// Event Listeners for Truck Status Modal

// Handle check-in/check-out link clicks
loadPostsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('check-time-link') && !e.target.classList.contains('disabled')) {
    const action = e.target.dataset.action;
    const postId = e.target.dataset.id;
    
    if (action === 'check-in' || action === 'check-out') {
      openTruckStatusModal(postId, action);
    }
  }
});

// Handle dropdown clicks
if (truckInOutHeader) {
  truckInOutHeader.addEventListener('click', () => {
    truckInOutList.style.display = truckInOutList.style.display === 'block' ? 'none' : 'block';
  });
}

// Handle dropdown option selection
if (truckInOutList) {
  truckInOutList.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
      const selectedValue = e.target.dataset.value;
      const selectedSpan = truckInOutHeader.querySelector('.selected-value');
      selectedSpan.textContent = selectedValue;
      currentTruckStatusContext.selectedType = selectedValue;
      truckInOutList.style.display = 'none';
      
      // Show/hide records section based on selection
      if (selectedValue === 'OUT') {
        truckStatusRecordsSection.style.display = 'block';
        loadTruckStatusRecords(currentTruckStatusContext.postId);
      } else {
        truckStatusRecordsSection.style.display = 'none';
      }
    }
  });
}

// Handle calendar icon click for truck status modal
function attachDatePickerEvents() {
  const truckStatusCalendarIcon = document.querySelector('.truck-status-modal-overlay .date-range-calendar-icon');
  const truckStatusDatePickerElement = document.getElementById("truckStatusDatePicker");
  
  if (truckStatusCalendarIcon && truckStatusDatePickerElement) {
    // Remove existing event listener to avoid duplicates
    truckStatusCalendarIcon.removeEventListener('click', handleCalendarClick);
    truckStatusCalendarIcon.addEventListener('click', handleCalendarClick);
  }
  
  // Handle date picker change
  if (truckStatusDatePickerElement) {
    truckStatusDatePickerElement.removeEventListener('change', handleDatePickerChange);
    truckStatusDatePickerElement.addEventListener('change', handleDatePickerChange);
  }
}

function handleCalendarClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const truckStatusDatePickerElement = document.getElementById("truckStatusDatePicker");
  if (truckStatusDatePickerElement) {
    truckStatusDatePickerElement.focus();
    
    if (truckStatusDatePickerElement.showPicker) {
      try {
        truckStatusDatePickerElement.showPicker();
      } catch (error) {
        truckStatusDatePickerElement.click();
      }
    } else {
      truckStatusDatePickerElement.click();
    }
  }
}

function handleDatePickerChange(e) {
  const selectedDate = e.target.value;
  if (selectedDate) {
    // Format the date and add current time
    const date = new Date(selectedDate);
    const now = new Date();
    date.setHours(now.getHours(), now.getMinutes());
    
    // Auto-save and close modal
    const action = currentTruckStatusContext.selectedType === 'IN' ? 'check-in' : 'check-out';
    updateTruckStatus(currentTruckStatusContext.postId, action, date.toISOString());
  }
}

// Close modal when clicking close button
if (closeTruckStatusModal) {
  closeTruckStatusModal.addEventListener('click', () => {
    truckStatusModalOverlay.style.display = 'none';
  });
}

// Close modal when clicking outside
if (truckStatusModalOverlay) {
  truckStatusModalOverlay.addEventListener('click', (e) => {
    if (e.target === truckStatusModalOverlay) {
      truckStatusModalOverlay.style.display = 'none';
    }
  });
}

// Vehicle Details Modal event handlers
if (closeVehicleDetailsModal) {
  closeVehicleDetailsModal.addEventListener('click', () => {
    vehicleDetailsModalOverlay.style.display = 'none';
  });
}

// Close vehicle details modal when clicking outside
if (vehicleDetailsModalOverlay) {
  vehicleDetailsModalOverlay.addEventListener('click', (e) => {
    if (e.target === vehicleDetailsModalOverlay) {
      vehicleDetailsModalOverlay.style.display = 'none';
    }
  });
}

// Upload Invoice Modal event handlers
if (closeUploadInvoiceModal) {
  closeUploadInvoiceModal.addEventListener('click', () => {
    uploadInvoiceModalOverlay.style.display = 'none';
  });
}

if (cancelUploadInvoice) {
  cancelUploadInvoice.addEventListener('click', () => {
    uploadInvoiceModalOverlay.style.display = 'none';
  });
}

if (saveUploadInvoice) {
  saveUploadInvoice.addEventListener('click', () => {
    // Handle save logic here
    alert('Invoices saved successfully!');
    uploadInvoiceModalOverlay.style.display = 'none';
  });
}

// Close upload invoice modal when clicking outside
if (uploadInvoiceModalOverlay) {
  uploadInvoiceModalOverlay.addEventListener('click', (e) => {
    if (e.target === uploadInvoiceModalOverlay) {
      uploadInvoiceModalOverlay.style.display = 'none';
    }
  });
}

// File upload handling
function setupFileUpload(type) {
  console.log(`Setting up file upload for type: ${type}`);
  const fileInput = document.getElementById(`${type}FileInput`);
  console.log(`File input found for ${type}:`, fileInput);
  let uploadArea;
  
  // Get the correct upload area ID based on type
  if (type === 'material') {
    uploadArea = document.getElementById('materialInvoiceArea');
  } else if (type === 'eway') {
    uploadArea = document.getElementById('ewayBillArea');
  } else if (type === 'other') {
    uploadArea = document.getElementById('otherDocsArea');
  }
  
  console.log(`Upload area found for ${type}:`, uploadArea);
  
  if (!uploadArea) {
    console.error(`Upload area not found for type: ${type}`);
    return;
  }
  
  // Check if already set up to avoid duplicate event listeners
  if (uploadArea.dataset.setupComplete === 'true') {
    return;
  }
  
  const browseLink = uploadArea.querySelector('.browse-link');
  console.log(`Browse link found for ${type}:`, browseLink);
  // Note: Remove buttons are now handled separately in the file-info-container
  
  // Browse link click
  if (browseLink) {
    browseLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Browse link clicked for ${type}`);
      if (fileInput) {
        fileInput.click();
      } else {
        console.error(`File input not found: ${type}FileInput`);
      }
    });
  } else {
    console.error(`Browse link not found for type: ${type}`);
  }
  
  // File input change
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(`File selected for ${type}:`, file.name);
        showFilePreview(type, file);
      }
    });
  } else {
    console.error(`File input not found: ${type}FileInput`);
  }
  
  // Mark as set up
  uploadArea.dataset.setupComplete = 'true';
  
  // Drag and drop functionality
  if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        showFilePreview(type, file);
        
        // Also update the file input
        const dt = new DataTransfer();
        dt.items.add(file);
        if (fileInput) {
          fileInput.files = dt.files;
        }
      }
    });
  }
  
  // Mark as set up to prevent duplicate event listeners
  uploadArea.dataset.setupComplete = 'true';
}

// Sample document data for demonstration - Always 3 sections
const sampleDocuments = {
  'view-document': [
    {
      name: 'Material Invoice',
      sectionTitle: 'MATERIAL INVOICE',
      image: 'excel.png', // Using the excel.png from your workspace
      hasDocument: true,
      type: 'material'
    },
    {
      name: 'E-Way Bill',
      sectionTitle: 'E-WAY BILL',
      image: 'Fastag Tracking.png', // Using existing image
      hasDocument: true,
      type: 'eway'
    },
    {
      name: '',
      sectionTitle: '',
      image: null,
      hasDocument: false,
      type: 'empty'
    }
  ],
  'view-pod': [
    {
      name: 'Material Invoice',
      sectionTitle: 'MATERIAL INVOICE',
      image: 'excel.png',
      hasDocument: true,
      type: 'material'
    },
    {
      name: 'E-Way Bill',
      sectionTitle: 'E-WAY BILL',
      image: 'Fastag Tracking.png',
      hasDocument: true,
      type: 'eway'
    },
    {
      name: '',
      sectionTitle: '',
      image: null,
      hasDocument: false,
      type: 'empty'
    }
  ]
};

// View Documents and POD Modal Functions
function showViewDocumentsModal() {
  console.log('showViewDocumentsModal called');
  
  const overlay = document.getElementById('viewDocumentsModalOverlay');
  const container = document.getElementById('documentsContainer');
  
  console.log('Modal elements:', { overlay, container });
  
  if (!overlay || !container) {
    console.error('Required modal elements not found');
    return;
  }
  
  // Clear previous content
  container.innerHTML = '';
  
  // Define the default 3 sections structure
  const defaultSections = [
    {
      name: 'Material Invoice',
      sectionTitle: 'MATERIAL INVOICE',
      image: null,
      hasDocument: false,
      type: 'material'
    },
    {
      name: 'E-Way Bill',
      sectionTitle: 'E-WAY BILL',
      image: null,
      hasDocument: false,
      type: 'eway'
    },
    {
      name: '',
      sectionTitle: '',
      image: null,
      hasDocument: false,
      type: 'empty'
    }
  ];
  
  // Merge with actual data, always ensuring 3 sections
  const documents = sampleDocuments['view-document'] || [];
  const sectionsToShow = [];
  
  for (let i = 0; i < 3; i++) {
    if (documents[i]) {
      sectionsToShow.push(documents[i]);
    } else {
      sectionsToShow.push(defaultSections[i]);
    }
  }
  
  // Create exactly 3 sections
  sectionsToShow.forEach((doc, index) => {
    const docSection = createDocumentSection(doc, index);
    container.appendChild(docSection);
  });
  
  console.log('Documents added to container:', container.children.length);
  
  // Show view documents modal
  overlay.style.display = 'flex';
  
  console.log('View Documents Modal should now be visible');
}

function showViewPodModal() {
  console.log('showViewPodModal called');
  
  const overlay = document.getElementById('viewPodModalOverlay');
  const container = document.getElementById('podContainer');
  
  console.log('POD Modal elements:', { overlay, container });
  
  if (!overlay || !container) {
    console.error('Required POD modal elements not found');
    return;
  }
  
  // Clear previous content
  container.innerHTML = '';
  
  // Define the default 3 sections structure
  const defaultSections = [
    {
      name: 'Material Invoice',
      sectionTitle: 'MATERIAL INVOICE',
      image: null,
      hasDocument: false,
      type: 'material'
    },
    {
      name: 'E-Way Bill',
      sectionTitle: 'E-WAY BILL',
      image: null,
      hasDocument: false,
      type: 'eway'
    },
    {
      name: '',
      sectionTitle: '',
      image: null,
      hasDocument: false,
      type: 'empty'
    }
  ];
  
  // Merge with actual data, always ensuring 3 sections
  const documents = sampleDocuments['view-pod'] || [];
  const sectionsToShow = [];
  
  for (let i = 0; i < 3; i++) {
    if (documents[i]) {
      sectionsToShow.push(documents[i]);
    } else {
      sectionsToShow.push(defaultSections[i]);
    }
  }
  
  // Create exactly 3 sections
  sectionsToShow.forEach((doc, index) => {
    const docSection = createDocumentSection(doc, index);
    container.appendChild(docSection);
  });
  
  console.log('POD Documents added to container:', container.children.length);
  
  // Show view POD modal
  overlay.style.display = 'flex';
  
  console.log('POD Modal should now be visible');
}

function createDocumentSection(doc, index) {
  const docSection = document.createElement('div');
  docSection.className = 'document-section';
  
  // If it's an empty section (type 'empty'), create completely blank space
  if (doc.type === 'empty') {
    // Just an empty div to maintain grid layout
    return docSection;
  }
  
  // Create the section HTML for non-empty sections
  docSection.innerHTML = `
    <div class="document-display-area" id="displayArea_${index}">
      <!-- Content will be added by JavaScript -->
    </div>
    <div class="document-info-row">
      <div class="document-name">${doc.name}</div>
    </div>
  `;
  
  // Get the display area and add content using DOM methods
  const displayArea = docSection.querySelector('.document-display-area');
  
  if (doc.hasDocument && doc.image) {
    // Create image element
    const img = document.createElement('img');
    img.src = doc.image;
    img.alt = doc.name;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    
    // Handle image load error
    img.onerror = function() {
      displayArea.innerHTML = `
        <div class="document-placeholder-display">
          <div class="placeholder-icon"></div>
          <div class="placeholder-text">Image not found</div>
        </div>
      `;
    };
    
    displayArea.appendChild(img);
  } else {
    // Show placeholder for no document
    displayArea.innerHTML = `
      <div class="document-placeholder-display">
        <div class="placeholder-icon"></div>
        <div class="placeholder-text">No document uploaded</div>
      </div>
    `;
  }
  
  return docSection;
}

function hideAllModals() {
  // Hide all modal content divs
  const modals = document.querySelectorAll('.modal-content');
  modals.forEach(modal => modal.style.display = 'none');
}

// Event handlers for view document buttons
document.addEventListener('click', (e) => {
  console.log('Document click detected:', e.target);
  
  if (e.target.closest('[data-action="view-document"]')) {
    e.preventDefault();
    e.stopPropagation();
    console.log('View Document button clicked');
    showViewDocumentsModal();
    return;
  }
  
  if (e.target.closest('[data-action="view-pod"]')) {
    e.preventDefault();
    e.stopPropagation();
    console.log('View POD button clicked');
    showViewPodModal();
    return;
  }
});

// Close button handlers for view modals
document.addEventListener('click', (e) => {
  if (e.target.id === 'closeViewDocuments') {
    document.getElementById('viewDocumentsModalOverlay').style.display = 'none';
  }
  
  if (e.target.id === 'closeViewPod') {
    document.getElementById('viewPodModalOverlay').style.display = 'none';
  }
});

// Close modal when clicking outside the modal content
document.addEventListener('click', (e) => {
  if (e.target.id === 'viewDocumentsModalOverlay') {
    document.getElementById('viewDocumentsModalOverlay').style.display = 'none';
  }
  
  if (e.target.id === 'viewPodModalOverlay') {
    document.getElementById('viewPodModalOverlay').style.display = 'none';
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-dropdown[data-target="truckInOut"]')) {
    truckInOutList.style.display = 'none';
  }
});

// Start the countdown timers when the main DOMContentLoaded is ready
// (This is handled within the main DOMContentLoaded function above)

}); // End of DOMContentLoaded
