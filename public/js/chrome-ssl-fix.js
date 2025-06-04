// Chrome SSL/HSTS Fix Script
(function() {
    'use strict';

    // Detect if user is on Chrome
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isMac = /Mac OS X/.test(navigator.userAgent);
    const isWindows = /Windows/.test(navigator.userAgent);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Update browser detection
        if (!isChrome) {
            document.getElementById('browser-warning').style.display = 'block';
        }

        // Update OS-specific instructions
        updateOSInstructions();

        // Add click handlers
        setupClickHandlers();

        // Add progress tracking
        loadProgress();
    }

    function updateOSInstructions() {
        const dnsCommands = document.getElementById('dns-commands');
        const osInstructions = document.getElementById('os-instructions');

        if (isMac) {
            dnsCommands.innerHTML = `
                <div class="command-box">
                    <code>sudo dscacheutil -flushcache</code>
                    <button class="copy-btn" data-copy="sudo dscacheutil -flushcache">Copy</button>
                </div>
                <div class="command-box">
                    <code>sudo killall -HUP mDNSResponder</code>
                    <button class="copy-btn" data-copy="sudo killall -HUP mDNSResponder">Copy</button>
                </div>
            `;
            osInstructions.textContent = 'Open Terminal (Cmd + Space, type "Terminal")';
        } else if (isWindows) {
            dnsCommands.innerHTML = `
                <div class="command-box">
                    <code>ipconfig /flushdns</code>
                    <button class="copy-btn" data-copy="ipconfig /flushdns">Copy</button>
                </div>
            `;
            osInstructions.textContent = 'Open Command Prompt as Administrator (Win + X, then A)';
        } else {
            dnsCommands.innerHTML = `
                <div class="command-box">
                    <code>sudo systemctl restart systemd-resolved</code>
                    <button class="copy-btn" data-copy="sudo systemctl restart systemd-resolved">Copy</button>
                </div>
            `;
            osInstructions.textContent = 'Open Terminal';
        }
    }

    function setupClickHandlers() {
        // Chrome URL buttons
        document.querySelectorAll('.chrome-url-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const url = this.dataset.url;
                // Create a temporary input to copy the URL
                const input = document.createElement('input');
                input.value = url;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                
                // Show copied message
                const originalText = this.textContent;
                this.textContent = 'URL Copied! Paste in address bar';
                this.classList.add('copied');
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 3000);

                // Try to open in new tab (may be blocked by popup blocker)
                window.open(url, '_blank');
            });
        });

        // Copy command buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const textToCopy = this.dataset.copy;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    setTimeout(() => {
                        this.textContent = 'Copy';
                        this.classList.remove('copied');
                    }, 2000);
                });
            });
        });

        // Step completion checkboxes
        document.querySelectorAll('.step-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const step = this.dataset.step;
                updateProgress(step, this.checked);
            });
        });

        // Test connection button
        document.getElementById('test-connection').addEventListener('click', testConnection);

        // Reset progress button
        document.getElementById('reset-progress').addEventListener('click', resetProgress);
    }

    function updateProgress(step, completed) {
        const progress = getProgress();
        progress[step] = completed;
        localStorage.setItem('chrome-ssl-fix-progress', JSON.stringify(progress));
        updateProgressBar();
    }

    function getProgress() {
        const saved = localStorage.getItem('chrome-ssl-fix-progress');
        return saved ? JSON.parse(saved) : {};
    }

    function loadProgress() {
        const progress = getProgress();
        Object.keys(progress).forEach(step => {
            const checkbox = document.querySelector(`[data-step="${step}"]`);
            if (checkbox) {
                checkbox.checked = progress[step];
            }
        });
        updateProgressBar();
    }

    function updateProgressBar() {
        const checkboxes = document.querySelectorAll('.step-checkbox');
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const total = checkboxes.length;
        const percentage = (completed / total) * 100;
        
        document.getElementById('progress-fill').style.width = percentage + '%';
        document.getElementById('progress-text').textContent = `${completed} of ${total} steps completed`;
    }

    function resetProgress() {
        localStorage.removeItem('chrome-ssl-fix-progress');
        document.querySelectorAll('.step-checkbox').forEach(cb => cb.checked = false);
        updateProgressBar();
    }

    function testConnection() {
        const btn = document.getElementById('test-connection');
        const result = document.getElementById('test-result');
        
        btn.disabled = true;
        btn.textContent = 'Testing...';
        result.className = 'test-result';
        result.textContent = 'Checking connection to qdaria.com...';

        // Test with a simple image request
        const testImg = new Image();
        const timeout = setTimeout(() => {
            testImg.src = '';
            result.className = 'test-result error';
            result.textContent = 'Connection failed. Please complete all steps and try again.';
            btn.disabled = false;
            btn.textContent = 'Test Connection';
        }, 5000);

        testImg.onload = function() {
            clearTimeout(timeout);
            result.className = 'test-result success';
            result.textContent = 'Success! You can now access qdaria.com';
            btn.disabled = false;
            btn.textContent = 'Test Again';
            
            // Show success actions
            document.getElementById('success-actions').style.display = 'block';
        };

        testImg.onerror = function() {
            clearTimeout(timeout);
            result.className = 'test-result error';
            result.textContent = 'Connection failed. Please complete all steps and try again.';
            btn.disabled = false;
            btn.textContent = 'Test Connection';
        };

        // Test with a small image from the site
        testImg.src = 'https://qdaria.com/favicons/favicon-16x16.png?' + Date.now();
    }
})();