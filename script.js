// Contract Claims Application - JavaScript

// Global state
let currentUser = null;
let currentRole = null;

// Screen navigation
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Role selection
function selectRole(role) {
    currentRole = role;
    
    switch(role) {
        case 'lecturer':
            showScreen('lecturerDashboard');
            break;
        case 'manager':
        case 'coordinator':
            showScreen('approvalPage');
            break;
        default:
            console.error('Unknown role:', role);
    }
}

// Personal details editing
function toggleEdit(sectionId) {
    const section = document.getElementById(sectionId);
    const editButton = section.parentElement.querySelector('.btn-outline');
    const editableSpans = section.querySelectorAll('.editable');
    
    if (editButton.textContent === 'Edit') {
        // Switch to edit mode
        editButton.textContent = 'Save';
        editButton.classList.remove('btn-outline');
        editButton.classList.add('btn-primary');
        
        editableSpans.forEach(span => {
            const currentText = span.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'form-control';
            input.style.display = 'inline-block';
            input.style.width = 'auto';
            input.style.minWidth = '150px';
            
            span.innerHTML = '';
            span.appendChild(input);
            input.focus();
        });
    } else {
        // Save changes
        editButton.textContent = 'Edit';
        editButton.classList.remove('btn-primary');
        editButton.classList.add('btn-outline');
        
        editableSpans.forEach(span => {
            const input = span.querySelector('input');
            if (input) {
                span.textContent = input.value;
            }
        });
        
        // Show save confirmation
        showNotification('Personal details updated successfully!', 'success');
    }
}

// Claim form dynamic fields
function updateClaimFields(claimType) {
    // Hide all conditional fields
    const conditionalFields = document.querySelectorAll('.conditional-fields');
    conditionalFields.forEach(field => {
        field.style.display = 'none';
    });
    
    // Show relevant fields based on claim type
    switch(claimType) {
        case 'teaching':
        case 'overtime':
            const teachingFields = document.getElementById('teachingFields');
            if (teachingFields) {
                teachingFields.style.display = 'block';
            }
            break;
        case 'materials':
        case 'travel':
            const expenseFields = document.getElementById('expenseFields');
            if (expenseFields) {
                expenseFields.style.display = 'block';
            }
            break;
    }
}

// File upload handling
function triggerFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
        fileInput.click();
    }
}

// Handle file selection
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const files = e.target.files;
            const uploadedFilesContainer = document.getElementById('uploadedFiles');
            
            if (uploadedFilesContainer && files.length > 0) {
                uploadedFilesContainer.innerHTML = '';
                
                Array.from(files).forEach((file, index) => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'uploaded-file-item';
                    fileItem.style.cssText = `
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0.75rem;
                        margin-bottom: 0.5rem;
                        background-color: var(--bg-color);
                        border: 1px solid var(--border-color);
                        border-radius: var(--border-radius);
                    `;
                    
                    fileItem.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-file" style="color: var(--primary-color);"></i>
                            <span>${file.name}</span>
                            <small style="color: var(--text-secondary);">(${(file.size / 1024).toFixed(1)} KB)</small>
                        </div>
                        <button type="button" onclick="removeFile(${index})" style="background: none; border: none; color: var(--danger-color); cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    uploadedFilesContainer.appendChild(fileItem);
                });
            }
        });
    }
});

// Remove uploaded file
function removeFile(index) {
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    const fileItems = uploadedFilesContainer.querySelectorAll('.uploaded-file-item');
    if (fileItems[index]) {
        fileItems[index].remove();
    }
}

// Submit claim form
function submitClaim(event) {
    event.preventDefault();
    
    // Simulate form validation
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Claim submitted successfully! You will receive a confirmation email shortly.', 'success');
        
        // Navigate to tracking screen
        setTimeout(() => {
            showScreen('claimTracking');
        }, 2000);
    }, 3000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        color: white;
        font-weight: 500;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Set color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = 'var(--success-color)';
            break;
        case 'error':
            notification.style.backgroundColor = 'var(--danger-color)';
            break;
        case 'warning':
            notification.style.backgroundColor = 'var(--warning-color)';
            break;
        default:
            notification.style.backgroundColor = 'var(--info-color)';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; margin-left: 1rem; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Claim approval actions
function approveClaim(claimId) {
    showNotification('Claim approved successfully!', 'success');
    // Update UI to reflect approval
    updateClaimStatus(claimId, 'approved');
}

function rejectClaim(claimId) {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
        showNotification('Claim rejected. Lecturer will be notified.', 'info');
        updateClaimStatus(claimId, 'rejected');
    }
}

function requestMoreInfo(claimId) {
    const message = prompt('What additional information do you need?');
    if (message) {
        showNotification('Information request sent to lecturer.', 'info');
    }
}

// Update claim status in UI
function updateClaimStatus(claimId, status) {
    // This would typically update the UI elements
    // For demo purposes, we'll just log it
    console.log(`Claim ${claimId} status updated to: ${status}`);
}

// Filter functionality for claims
function filterClaims(filterType, value) {
    // This would implement filtering logic for the claims list
    console.log(`Filtering claims by ${filterType}: ${value}`);
}

// Search functionality
function searchClaims(query) {
    // This would implement search logic
    console.log(`Searching claims for: ${query}`);
}

// Initialize drag and drop for file upload
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
            uploadArea.style.backgroundColor = 'var(--bg-color)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = 'transparent';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = 'transparent';
            
            const files = e.dataTransfer.files;
            const fileInput = document.getElementById('fileUpload');
            if (fileInput && files.length > 0) {
                fileInput.files = files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to go back
    if (e.key === 'Escape') {
        const currentScreen = document.querySelector('.screen.active');
        if (currentScreen && currentScreen.id !== 'mainScreen') {
            if (currentScreen.id === 'lecturerDashboard') {
                showScreen('mainScreen');
            } else {
                showScreen('lecturerDashboard');
            }
        }
    }
    
    // Ctrl/Cmd + S to save (prevent default save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const activeForm = document.querySelector('.screen.active form');
        if (activeForm) {
            showNotification('Draft saved!', 'success');
        }
    }
});

// Auto-save functionality for forms
function enableAutoSave() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Simulate auto-save
                localStorage.setItem(`autosave_${form.id || 'form'}`, JSON.stringify(getFormData(form)));
            });
        });
    });
}

// Get form data as object
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

// Load saved form data
function loadFormData(formId) {
    const savedData = localStorage.getItem(`autosave_${formId}`);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            const form = document.getElementById(formId);
            if (form) {
                Object.keys(data).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = data[key];
                    }
                });
            }
        } catch (e) {
            console.error('Error loading saved form data:', e);
        }
    }
}

// Initialize auto-save when page loads
document.addEventListener('DOMContentLoaded', function() {
    enableAutoSave();
});

// Mock data for development
const mockClaims = [
    {
        id: 'CLM001',
        title: 'Teaching Hours - October 2024',
        contract: 'Teaching Contract - Fall 2024 (CS 101)',
        amount: 1200.00,
        status: 'under-review',
        submittedDate: '2024-11-01',
        claimant: 'Dr. Sarah Johnson'
    },
    {
        id: 'CLM002',
        title: 'Course Materials',
        contract: 'Teaching Contract - Fall 2024 (CS 101)',
        amount: 150.00,
        status: 'approved',
        submittedDate: '2024-10-25',
        claimant: 'Dr. Sarah Johnson'
    }
];

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showScreen,
        selectRole,
        toggleEdit,
        updateClaimFields,
        submitClaim,
        showNotification
    };
}