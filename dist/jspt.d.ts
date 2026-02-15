export interface PopupOptions {
    style?: 'default';
    content_type?: 'text' | 'html';
    header?: string;
    title?: string;
    message?: string;
    content?: string;
    close_on_blur?: boolean;
    custom_id?: string;
}

export interface ToastOptions {
    style?: 'default' | 'default-error' | string;
    message: string;
    custom_id?: string;
    icon_left?: string;
    icon_left_type?: 'google_material_rounded' | 'google_material_outlined' | 'svg' | 'image' | 'text' | 'emoji' | 'lucide_icon';
    icon_left_action?: () => void;
    icon_right?: string;
    icon_right_type?: 'google_material_rounded' | 'google_material_outlined' | 'svg' | 'image' | 'text' | 'emoji' | 'lucide_icon';
    icon_right_action?: () => void;
    duration?: number;
    close_on_click?: boolean;
    onclick?: () => void;
}

export interface ClosePopupOptions {
    custom_id: string;
}

export function makePopup(options: PopupOptions): void;

export function makeToast(options: ToastOptions): void;

export function closePopup(options: ClosePopupOptions): void;

declare const jspt: {
    makePopup: typeof makePopup;
    makeToast: typeof makeToast;
    closePopup: typeof closePopup;
};

export default jspt;

declare global {
    interface Window {
        jspt: typeof jspt;
    }
}
