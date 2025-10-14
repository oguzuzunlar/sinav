/* Minimal SCORM 1.2 wrapper
   - Provides init(), finish(), get(), set(), commit(), setCompleted(), setScore()
   - Safe to include in non-LMS environment (no-ops with console warnings)
   - Tries to find API in parent frames per SCORM 1.2 spec
*/
(function(window){
    'use strict';
    function findAPI(win) {
        var attempts = 0;
        while (win && attempts < 50) {
            try {
                if (win.API) return win.API;
            } catch (e) {}
            try { win = win.parent; } catch (e) { break; }
            attempts++;
        }
        return null;
    }

    var API = null; // reference to LMS API
    var initialized = false;

    function init() {
        if (initialized) return true;
        try {
            API = findAPI(window);
            if (!API && window.opener) API = findAPI(window.opener);
            if (API) {
                var res = API.LMSInitialize('');
                initialized = (res === 'true' || res === true);
                console.log('SCORM: API initialized:', initialized);
                return initialized;
            } else {
                console.warn('SCORM API not found. Running in non-LMS mode.');
                return false;
            }
        } catch (e) {
            console.warn('SCORM init error', e);
            return false;
        }
    }

    function finish() {
        if (!API || !initialized) return false;
        try {
            var res = API.LMSFinish('');
            initialized = false;
            return (res === 'true' || res === true);
        } catch (e) { console.warn('SCORM finish error', e); return false; }
    }

    function get(key) {
        if (!API || !initialized) return null;
        try { return API.LMSGetValue(key); } catch (e) { console.warn('SCORM get error', e); return null; }
    }
    function set(key, value) {
        if (!API || !initialized) return false;
        try { var res = API.LMSSetValue(key, value); return (res === 'true' || res === true); } catch (e) { console.warn('SCORM set error', e); return false; }
    }
    function commit() {
        if (!API || !initialized) return false;
        try { var res = API.LMSCommit(''); return (res === 'true' || res === true); } catch (e) { console.warn('SCORM commit error', e); return false; }
    }

    function setCompleted() {
        if (!init()) return false;
        try {
            // set lesson_status to completed (SCORM 1.2 uses cmi.core.lesson_status)
            set('cmi.core.lesson_status', 'completed');
            commit();
            return true;
        } catch (e) { console.warn('SCORM setCompleted error', e); return false; }
    }
    function setScore(raw) {
        if (!init()) return false;
        try {
            // SCORM 1.2 score fields
            set('cmi.core.score.raw', String(raw));
            // Optionally set min/max
            set('cmi.core.score.min', '0');
            set('cmi.core.score.max', '100');
            commit();
            return true;
        } catch (e) { console.warn('SCORM setScore error', e); return false; }
    }

    // Expose minimal API on window.SCORM
    window.SCORM = {
        init: init,
        finish: finish,
        get: get,
        set: set,
        commit: commit,
        setCompleted: setCompleted,
        setScore: setScore
    };

})(window);
