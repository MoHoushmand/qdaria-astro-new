/**
 * Emergency Cache Clearing Script for QDaria.com
 * This script helps clear various browser caches and stored data
 * to resolve HSTS/SSL cached policy issues
 */

(function() {
    'use strict';
    
    const CACHE_CLEAR_VERSION = '1.0.0';
    
    // Log function for debugging
    function log(message, type = 'info') {
        const prefix = '[QDaria Cache Clear]';
        if (type === 'error') {
            console.error(`${prefix} ${message}`);
        } else if (type === 'warn') {
            console.warn(`${prefix} ${message}`);
        } else {
            console.log(`${prefix} ${message}`);
        }
    }
    
    // Clear all caches
    async function clearAllCaches() {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                const deletePromises = cacheNames.map(cacheName => {
                    log(`Deleting cache: ${cacheName}`);
                    return caches.delete(cacheName);
                });
                await Promise.all(deletePromises);
                log(`Successfully cleared ${cacheNames.length} cache(s)`);
                return true;
            } catch (error) {
                log(`Failed to clear caches: ${error.message}`, 'error');
                return false;
            }
        } else {
            log('Cache API not supported in this browser', 'warn');
            return false;
        }
    }
    
    // Clear storage (localStorage and sessionStorage)
    function clearStorage() {
        try {
            // Clear localStorage
            const localStorageKeys = Object.keys(localStorage);
            localStorage.clear();
            log(`Cleared ${localStorageKeys.length} localStorage items`);
            
            // Clear sessionStorage
            const sessionStorageKeys = Object.keys(sessionStorage);
            sessionStorage.clear();
            log(`Cleared ${sessionStorageKeys.length} sessionStorage items`);
            
            return true;
        } catch (error) {
            log(`Failed to clear storage: ${error.message}`, 'error');
            return false;
        }
    }
    
    // Unregister all service workers
    async function unregisterServiceWorkers() {
        if ('serviceWorker' in navigator) {
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                const unregisterPromises = registrations.map(registration => {
                    log(`Unregistering service worker: ${registration.scope}`);
                    return registration.unregister();
                });
                await Promise.all(unregisterPromises);
                log(`Successfully unregistered ${registrations.length} service worker(s)`);
                return true;
            } catch (error) {
                log(`Failed to unregister service workers: ${error.message}`, 'error');
                return false;
            }
        } else {
            log('Service Worker API not supported in this browser', 'warn');
            return false;
        }
    }
    
    // Clear cookies for current domain
    function clearCookies() {
        try {
            const cookies = document.cookie.split(';');
            let clearedCount = 0;
            
            cookies.forEach(cookie => {
                const eqPos = cookie.indexOf('=');
                const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
                if (name) {
                    // Clear cookie for current path
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                    // Also try to clear for current domain
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
                    // Try with www subdomain
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
                    clearedCount++;
                }
            });
            
            log(`Attempted to clear ${clearedCount} cookie(s)`);
            return true;
        } catch (error) {
            log(`Failed to clear cookies: ${error.message}`, 'error');
            return false;
        }
    }
    
    // Clear IndexedDB databases
    async function clearIndexedDB() {
        if ('indexedDB' in window) {
            try {
                const databases = await indexedDB.databases();
                const deletePromises = databases.map(db => {
                    log(`Deleting IndexedDB: ${db.name}`);
                    return indexedDB.deleteDatabase(db.name);
                });
                await Promise.all(deletePromises);
                log(`Successfully cleared ${databases.length} IndexedDB database(s)`);
                return true;
            } catch (error) {
                log(`Failed to clear IndexedDB: ${error.message}`, 'error');
                return false;
            }
        } else {
            log('IndexedDB not supported in this browser', 'warn');
            return false;
        }
    }
    
    // Add cache-busting to all internal links
    function addCacheBusting() {
        const timestamp = new Date().getTime();
        const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        let modifiedCount = 0;
        
        links.forEach(link => {
            try {
                const url = new URL(link.href, window.location.href);
                // Only modify same-origin links
                if (url.origin === window.location.origin) {
                    url.searchParams.set('_cb', timestamp);
                    link.href = url.toString();
                    modifiedCount++;
                }
            } catch (error) {
                // Invalid URL, skip
            }
        });
        
        log(`Added cache busting to ${modifiedCount} link(s)`);
    }
    
    // Force reload without cache
    function forceReload() {
        // Try multiple methods to force a hard reload
        if (window.location.reload) {
            window.location.reload(true);
        } else {
            window.location.href = window.location.href;
        }
    }
    
    // Main execution function
    async function executeCacheClear() {
        log('Starting cache clear process...');
        
        const results = {
            caches: await clearAllCaches(),
            storage: clearStorage(),
            serviceWorkers: await unregisterServiceWorkers(),
            cookies: clearCookies(),
            indexedDB: await clearIndexedDB()
        };
        
        // Count successful operations
        const successCount = Object.values(results).filter(result => result === true).length;
        const totalOperations = Object.keys(results).length;
        
        log(`Cache clear complete: ${successCount}/${totalOperations} operations successful`);
        
        // Store clear version to detect if script has run
        try {
            sessionStorage.setItem('qdaria_cache_clear_version', CACHE_CLEAR_VERSION);
        } catch (e) {
            // Storage might be disabled
        }
        
        return results;
    }
    
    // Check if we should auto-run
    function shouldAutoRun() {
        // Check if there's an HSTS or SSL error in the page
        const pageText = document.body ? document.body.textContent.toLowerCase() : '';
        const errorKeywords = ['hsts', 'ssl', 'https', 'security', 'certificate', 'net::err'];
        
        return errorKeywords.some(keyword => pageText.includes(keyword));
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        // Add cache busting to links
        addCacheBusting();
        
        // Check if we should auto-run cache clearing
        if (shouldAutoRun()) {
            log('Detected potential HSTS/SSL error, auto-running cache clear...');
            executeCacheClear();
        }
        
        // Expose functions globally for manual use
        window.QDariaCacheClear = {
            clear: executeCacheClear,
            forceReload: forceReload,
            version: CACHE_CLEAR_VERSION
        };
        
        log('Cache clear utilities loaded. Use window.QDariaCacheClear.clear() to manually clear caches.');
    }
})();