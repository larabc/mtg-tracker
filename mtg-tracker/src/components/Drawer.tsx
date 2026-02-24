import { useState } from "react";

type DrawerProps = {
    isOpen: boolean,
    onClose: () => void
}
export default function Drawer({ isOpen, onClose }: DrawerProps) {

    const [formData, setFormData] = useState({
        name: '',
        format: '',
        colors: [],
        archetype: '',
        comments: ''
    })

    return (
        <div>
            <button onClick={onClose}>
                Close
            </button>
        </div>
    )
}