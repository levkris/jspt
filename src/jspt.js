/**
 * @typedef {Object} PopupOptions
 * @property {'default'} [style='default']
 * @property {'text'|'html'} [content_type='text']
 * @property {string} [header]
 * @property {string} [title]
 * @property {string} [message]
 * @property {string} [content]
 * @property {boolean} [close_on_blur=true]
 * @property {string} [custom_id]
 */

/**
 * @typedef {Object} ClosePopupOptions
 * @property {string} custom_id
 */

/**
 * @typedef {Object} ToastOptions
 * @property {'default'|'default-error'|string} [style='default']
 * @property {string} message
 * @property {string} [custom_id]
 * @property {string} [icon_left]
 * @property {'google_material_rounded'|'google_material_outlined'|'svg'|'image'|'text'|'emoji'|'lucide_icon'} [icon_left_type='google_material_rounded']
 * @property {Function} [icon_left_action]
 * @property {string} [icon_right]
 * @property {'google_material_rounded'|'google_material_outlined'|'svg'|'image'|'text'|'emoji'|'lucide_icon'} [icon_right_type='google_material_rounded']
 * @property {Function} [icon_right_action]
 * @property {number} [duration=5000]
 * @property {boolean} [close_on_click=false]
 * @property {Function} [onclick]
 */

/**
 * @typedef {Object} ImportScript
 * @property {Array<'highlightjs'|'material_symbols_rounded'|'material_symbols_outlined'|'lucide'>} names
 */

let debugMode = false;

const jspt = {
    /**
     * @param {ImportScript} options
     * @returns {Promise<void[]>}
     */
    importScript: function(options) {
        const { names } = options;
        
        const loadPromises = names.map(name => {
            return new Promise((resolve, reject) => {
                switch (name) {
                    case 'highlightjs':
                        const hljsSrc = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
                        const hljsStyleHref = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css';
                        
                        if (document.querySelector(`script[src="${hljsSrc}"]`) || document.querySelector(`link[href="${hljsStyleHref}"]`)) {
                            console.warn(`${name} is already imported`);
                            resolve(undefined);
                            break;
                        }
                        
                        const hljs = document.createElement('script');
                        hljs.src = hljsSrc;
                        hljs.onload = () => resolve(undefined);
                        hljs.onerror = () => reject(new Error(`Failed to load ${name}`));
                        document.head.appendChild(hljs);

                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = hljsStyleHref;
                        document.head.appendChild(link);
                        break;
                    case 'material_symbols_rounded':
                        const msrHref = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
                        
                        if (document.querySelector(`link[href="${msrHref}"]`)) {
                            console.warn(`${name} is already imported`);
                            resolve(undefined);
                            break;
                        }
                        
                        const msr = document.createElement('link');
                        msr.rel = 'stylesheet';
                        msr.href = msrHref;
                        msr.onload = () => resolve(undefined);
                        msr.onerror = () => reject(new Error(`Failed to load ${name}`));
                        document.head.appendChild(msr);
                        break;
                    case 'material_symbols_outlined':
                        const msoHref = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
                        
                        if (document.querySelector(`link[href="${msoHref}"]`)) {
                            console.warn(`${name} is already imported`);
                            resolve(undefined);
                            break;
                        }
                        
                        const mso = document.createElement('link');
                        mso.rel = 'stylesheet';
                        mso.href = msoHref;
                        mso.onload = () => resolve(undefined);
                        mso.onerror = () => reject(new Error(`Failed to load ${name}`));
                        document.head.appendChild(mso);
                        break;
                    case 'lucide':
                        const lucideSrc = 'https://unpkg.com/lucide@latest';
                        
                        if (document.querySelector(`script[src="${lucideSrc}"]`)) {
                            console.warn(`${name} is already imported`);
                            resolve(undefined);
                            break;
                        }
                        
                        const lucide = document.createElement('script');
                        lucide.src = lucideSrc;
                        lucide.onload = () => resolve(undefined);
                        lucide.onerror = () => reject(new Error(`Failed to load ${name}`));
                        document.head.appendChild(lucide);
                        break;
                    default:
                        resolve(undefined);
                }
            });
        });
        
        return Promise.all(loadPromises);
    },
    
    /**
     * @param {ClosePopupOptions} options
     * @returns {void}
     */
    closePopup: function(options) {
        const { custom_id } = options;
        const popup = document.querySelector(`.popup-container#${custom_id}`)
        if (popup) {
            popup.remove();
        }
    },
    /**
     * @param {PopupOptions} options
     * @returns {void}
     */
    makePopup: function(options) {
        const {
            style = 'default',
            content_type = 'text',
            header,
            title,
            message,
            content,
            close_on_blur = true,
            custom_id = Math.random().toString(36).substring(2)
        } = options;

        const sanitize = (input) => input
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const createErrorPopupContent = (lineNumber, error_message) => {
            return fetch(location.href)
                .then(res => res.text())
                .then(code => {
                    const lines = code.split('\n');
                    const start = Math.max(0, lineNumber - 3);
                    const end = Math.min(lines.length, lineNumber + 10);
                    const snippetLines = lines.slice(start, end);

                    while (snippetLines.length && snippetLines[snippetLines.length - 1].trim() === '') {
                        snippetLines.pop();
                    }

                    const snippet = snippetLines.map((line, i) => {
                        const actualLine = start + i + 1;

                        if (!/\S/.test(line)) return '';

                        const leadingSpaces = line.match(/^\s*/)[0]
                            .replace(/ /g, '&nbsp;')
                            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                        const highlighted = hljs.highlight(line.trimStart(), { language: 'javascript' }).value;

                        if (actualLine === lineNumber) {
                            return `<span class="popup-error-code-line popup-error-code-line-highlight"><span class="popup-error-code-line-number">${actualLine}</span>${leadingSpaces}${highlighted}</span>`;
                        }
                        return `<span class="popup-error-code-line"><span class="popup-error-code-line-number">${actualLine}</span>${leadingSpaces}${highlighted}</span>`;
                    }).join('');

                    return `
                        <p>${error_message}</p>
                        <pre class="popup-error-code">
                            <div class="popup-error-code-header"><p class="popup-error-code-header-file">${location.href.split('/').pop().split('?')[0]}</p></div>
                            <code class="hljs language-javascript">${snippet}</code>
                        </pre>
                    `;
                })
                .catch(err => {
                    console.error('Failed to fetch source:', err);
                    return `<p>Failed to fetch source code</p>`;
                });
        };

        const popup = document.createElement('div');
        popup.classList.add('popup');

        if (content_type === 'text') {
            if (content) {
                const err = new Error();
                const stackLines = err.stack.split('\n');
                const callerLine = stackLines[2] || '';
                const lineMatch = callerLine.match(/:(\d+):\d+\)?$/);
                const lineNumber = lineMatch ? parseInt(lineMatch[1]) : null;

                const errorMsg = `Error on line ${lineNumber}: Cannot use content when content_type is text in jspt.makePopup(), Please make sure content is not provided`;

                if (lineNumber) {
                    createErrorPopupContent(lineNumber, errorMsg).then(popupContent => {
                        jspt.makeToast({
                            style: "default-error",
                            message: errorMsg,
                            duration: -1,
                            close_on_click: true,
                            icon_left: "unknown_document",
                            icon_left_type: "google_material_rounded",
                            icon_left_action: () => {
                                jspt.makePopup({
                                    content_type: "html",
                                    header: "Error",
                                    content: popupContent
                                });
                            }
                        });
                    });
                } else {
                    jspt.makeToast({
                        style: "default-error",
                        message: errorMsg,
                        duration: -1,
                        close_on_click: true
                    });
                }
            }
        } else if (content_type === 'html') {
            if (message) {
                const stackLines = new Error().stack.split('\n');
                const callerLine = stackLines[2] || '';
                const lineMatch = callerLine.match(/:(\d+):\d+\)?$/);
                const lineNumber = lineMatch ? parseInt(lineMatch[1]) : null;

                const errorMsg = `Error on line ${lineNumber}: Cannot use message when content_type is html in jspt.makePopup(), Please make sure message is not provided`;

                if (lineNumber) {
                    createErrorPopupContent(lineNumber, errorMsg).then(popupContent => {
                        jspt.makeToast({
                            style: "default-error",
                            message: errorMsg,
                            duration: -1,
                            close_on_click: true,
                            icon_left: "unknown_document",
                            icon_left_type: "google_material_rounded",
                            icon_left_action: () => {
                                jspt.makePopup({
                                    content_type: "html",
                                    header: "Error",
                                    content: popupContent
                                });
                            }
                        });
                    });
                } else {
                    jspt.makeToast({
                        style: "default-error",
                        message: errorMsg,
                        duration: -1,
                        close_on_click: true
                    });
                }
            }
            if (title) {
                const stackLines = new Error().stack.split('\n');
                const callerLine = stackLines[2] || '';
                const lineMatch = callerLine.match(/:(\d+):\d+\)?$/);
                const lineNumber = lineMatch ? parseInt(lineMatch[1]) : null;

                const errorMsg = `Error on line ${lineNumber}: Cannot use title when content_type is html in jspt.makePopup(), Please make sure title is not provided`;

                if (lineNumber) {
                    createErrorPopupContent(lineNumber, errorMsg).then(popupContent => {
                        jspt.makeToast({
                            style: "default-error",
                            message: errorMsg,
                            duration: -1,
                            close_on_click: true,
                            icon_left: "unknown_document",
                            icon_left_type: "google_material_rounded",
                            icon_left_action: () => {
                                jspt.makePopup({
                                    content_type: "html",
                                    header: "Error",
                                    content: popupContent
                                });
                            }
                        });
                    });
                } else {
                    jspt.makeToast({
                        style: "default-error",
                        message: errorMsg,
                        duration: -1,
                        close_on_click: true
                    });
                }
            }
        }

        const popupHeader = document.createElement('div');
        popupHeader.classList.add('popup-header');

        const popupHeaderTitle = document.createElement('p');
        popupHeaderTitle.innerText = header || '';
        popupHeader.appendChild(popupHeaderTitle);

        const popupHeaderClose = document.createElement('span');
        popupHeaderClose.classList.add('popup-header-close');
        popupHeaderClose.innerHTML = '&times;';
        popupHeaderClose.addEventListener('click', () => {
            popupContainer.remove();
        });
        popupHeader.appendChild(popupHeaderClose);

        popup.appendChild(popupHeader);

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        if (content_type === 'text') {
            if (title) {
                const popupTitle = document.createElement('h3');
                popupTitle.innerText = title;
                popupContent.appendChild(popupTitle);
            }
            if (message) {
                const popupMessage = document.createElement('p');
                popupMessage.innerText = message;
                popupContent.appendChild(popupMessage);
            }
        } else if (content_type === 'html') {
            popupContent.innerHTML = content || '';
        }

        popup.appendChild(popupContent);

        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');
        popupContainer.appendChild(popup);
        popupContainer.id = custom_id;

        if (close_on_blur) {
            popupContainer.addEventListener('click', (e) => {
                if (e.target === popupContainer) {
                    popupContainer.remove();
                }
            });
        }

        document.body.appendChild(popupContainer);
    },

    /**
     * @param {ToastOptions} options
     * @returns {void}
     */
    makeToast: function(options) {
        const {
            style = 'default',
            message,
            custom_id,
            icon_left,
            icon_left_type = 'google_material_rounded',
            icon_left_action,
            icon_right,
            icon_right_type = 'google_material_rounded',
            icon_right_action,
            duration = 5000,
            close_on_click = false,
            onclick
        } = options;

        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.classList.add('toast-container');
            document.body.appendChild(container);
        }

        const existingToast = custom_id ? document.getElementById(custom_id) : null;
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (custom_id) toast.id = custom_id;

        if (style.startsWith('toast-')) {
            toast.classList.add(style);
        } else {
            toast.classList.add(`toast-${style}`);
        }

        if (icon_left) {
            const iconLeftElement = document.createElement('span');
            iconLeftElement.classList.add('toast-icon');

            if (icon_left_action) {
                iconLeftElement.classList.add('action');
                iconLeftElement.style.setProperty('--cursor', 'pointer');
                iconLeftElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    icon_left_action();
                });
            }

            switch (icon_left_type) {
                case 'google_material_rounded':
                    iconLeftElement.classList.add('material-symbols-rounded');
                    iconLeftElement.innerText = icon_left;
                    break;
                case 'google_material_outlined':
                    iconLeftElement.classList.add('material-symbols-outlined');
                    iconLeftElement.innerText = icon_left;
                    break;
                case 'svg':
                    iconLeftElement.innerHTML = icon_left;
                    break;
                case 'image':
                    const img = document.createElement('img');
                    img.src = icon_left;
                    img.classList.add('toast-icon-image');
                    if (icon_left_action) img.classList.add('action');
                    iconLeftElement.appendChild(img);
                    break;
                case 'text':
                    iconLeftElement.innerText = icon_left;
                    break;
                case 'emoji':
                    iconLeftElement.innerText = icon_left;
                    break;
                case 'lucide_icon':
                    if (typeof lucide === 'undefined') console.warn('Lucide is not loaded, please load it first.');
                    iconLeftElement.dataset.lucide = icon_left;
                    break;
            }

            toast.appendChild(iconLeftElement);
        }

        const toastText = document.createElement('span');
        toastText.classList.add('toast-text');
        toastText.innerHTML = message;
        toast.appendChild(toastText);

        if (icon_right) {
            const iconRightElement = document.createElement('span');
            iconRightElement.classList.add('toast-icon');

            if (icon_right_action) {
                iconRightElement.classList.add('action');
                iconRightElement.style.setProperty('--cursor', 'pointer');
                iconRightElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    icon_right_action();
                });
            }

            switch (icon_right_type) {
                case 'google_material_rounded':
                    iconRightElement.classList.add('material-symbols-rounded');
                    iconRightElement.innerText = icon_right;
                    break;
                case 'google_material_outlined':
                    iconRightElement.classList.add('material-symbols-outlined');
                    iconRightElement.innerText = icon_right;
                    break;
                case 'svg':
                    iconRightElement.innerHTML = icon_right;
                    break;
                case 'image':
                    const img = document.createElement('img');
                    img.src = icon_right;
                    img.classList.add('toast-icon-image');
                    if (icon_right_action) img.classList.add('action');
                    iconRightElement.appendChild(img);
                    break;
                case 'text':
                    iconRightElement.innerText = icon_right;
                    break;
                case 'emoji':
                    iconRightElement.innerText = icon_right;
                    break;
                case 'lucide_icon':
                    if (typeof lucide === 'undefined') console.warn('Lucide is not loaded, please load it first.');
                    iconRightElement.dataset.lucide = icon_right;
                    break;
            }

            toast.appendChild(iconRightElement);
        }

        if (duration > 0) {
            const toastDurationBar = document.createElement('div');
            toastDurationBar.classList.add('toast-duration-bar');
            toast.appendChild(toastDurationBar);

            setTimeout(() => {
                toastDurationBar.style.width = '100%';
                toastDurationBar.style.transition = `width ${duration}ms linear`;
            }, 10);

            setTimeout(() => {
                removeToast(toast);
            }, duration);
        }

        if (close_on_click) {
            toast.style.setProperty('--cursor', 'pointer');
            toast.addEventListener('click', (e) => {
                if (e.target.classList.contains('action')) return;
                removeToast(toast);
            });
        }

        container.appendChild(toast);

        if (onclick) {
            toast.style.setProperty('--cursor', 'pointer');
            toast.addEventListener('click', (e) => {
                if (e.target.classList.contains('action')) return;
                onclick();
                updateToasts();
                container.dispatchEvent(new CustomEvent('mouseleave'));
            });
        }

        function updateToasts() {
            const toasts = Array.from(container.querySelectorAll('.toast'));
            if (!toasts.length) return;

            const cs = getComputedStyle(container);
            const gap = parseFloat(cs.gap || cs.rowGap || '0') || 0;

            const originalHeights = toasts.map(t => t.getBoundingClientRect().height);

            const lastIndex = toasts.length - 1;

            toasts.forEach((t, i) => {
                t.style.zIndex = String(100 + i);
                t.classList.remove('stacked');
            });

            if (toasts.length === 1) {
                toasts[0].style.setProperty('--translate', '0px');
                return;
            }

            for (let i = 0; i < toasts.length; i++) {
                const toast = toasts[i];

                if (i === lastIndex) {
                    toast.style.setProperty('--translate', '0px');
                } else if (i === lastIndex - 1) {
                    const translate = originalHeights[i] + gap - 5;
                    toast.style.setProperty('--translate', `${translate}px`);
                    toast.style.setProperty('--scale', '0.97');
                    toast.classList.add('stacked');
                } else {
                    let delta = 0;
                    for (let k = i; k <= lastIndex - 1; k++) {
                        delta += originalHeights[k] + gap - 2;
                    }
                    toast.style.setProperty('--translate', `${delta}px`);
                    toast.style.setProperty('--scale', '0.97');
                    toast.classList.add('stacked');
                }
            }
        }

        function removeToast(toast) {
            const toasts = Array.from(container.querySelectorAll('.toast'));
            const index = toasts.indexOf(toast);

            const toastRects = toasts.map(t => t.getBoundingClientRect());

            toasts.forEach((el, i) => {
                if (i < index) {
                    el.style.transition = 'transform 0.25s ease';
                    el.style.transform = `translateY(${toastRects[index].height + 8}px)`;
                }
            });

            toast.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
            toast.style.transform = `translateX(100%)`;
            toast.style.opacity = '0';

            toast.addEventListener('transitionend', () => {
                toast.remove();
                toasts.forEach(el => {
                    el.style.transition = '';
                    el.style.transform = '';
                });
            }, { once: true });
        }

        let toastTimeout;

        function expandToastsOnContainerHover(container) {
            const toasts = Array.from(container.querySelectorAll('.toast'));

            const expandedHeights = toasts.map((toast) => {
                const clone = toast.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.visibility = 'hidden';
                clone.style.height = 'auto';
                clone.style.whiteSpace = 'normal';
                clone.style.overflow = 'visible';
                clone.style.textOverflow = 'unset';
                clone.style.wordBreak = 'break-word';
                container.appendChild(clone);
                const height = clone.offsetHeight;
                container.removeChild(clone);
                return height;
            });

            const expandAll = () => {
                toasts.forEach((toast, i) => {
                    const textHeight = toast.querySelector('.toast-text').scrollHeight;
                    const height = textHeight > expandedHeights[i] ? expandedHeights[i] + 20 : expandedHeights[i] - 20;
                    toast.style.height = `${height}px`;
                });
            };

            const resetAll = () => {
                toasts.forEach((toast) => toast.style.height = '');
            };

            container.addEventListener('mouseenter', () => {
                if (toastTimeout) {
                    clearTimeout(toastTimeout);
                    toastTimeout = null;
                }
                expandAll();
            });

            container.addEventListener('mouseleave', () => {
                resetAll();
                if (toastTimeout) {
                    clearTimeout(toastTimeout);
                }
                toastTimeout = setTimeout(() => {
                    toastTimeout = null;
                }, 300);
            });
        }

        expandToastsOnContainerHover(container);
        updateToasts();

        window.addEventListener('resize', updateToasts);

        const mo = new MutationObserver(updateToasts);
        mo.observe(container, { childList: true });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};

const currentScript = document.currentScript;
const params = currentScript ? new URL(currentScript.src).searchParams : new URLSearchParams();

window.addEventListener('DOMContentLoaded', () => {
    if (params.get('debug') === 'true') {
        debugMode = true;

        if (currentScript && !currentScript.src.includes('https://cdn.wokki20.nl/content')) {
            console.log('Debug mode disabled.');
            console.log('This script is not hosted on cdn.wokki20.nl, debug mode is disabled. Please use https://cdn.wokki20.nl/content/jspt_latest/jspt.js instead.');
            console.log('If you are hosting this script yourself, you can manually enable debug mode by changing debugMode to true in the script.');
            debugMode = false;

            if (typeof jspt !== 'undefined') {
                jspt.makeToast({
                    style: "default-error",
                    message: "This script is not hosted on cdn.wokki20.nl, please check console for more information.",
                    duration: -1,
                    close_on_click: true
                });
            }
            return;
        }

        console.log('Debug mode enabled');

        if (typeof jspt !== 'undefined') {
            jspt.makeToast({
                style: "default",
                message: "Debug mode enabled, do not use in production",
                duration: -1,
                close_on_click: true
            });
        }
    }
});

if (typeof window !== 'undefined') {
    window.jspt = jspt;
}
