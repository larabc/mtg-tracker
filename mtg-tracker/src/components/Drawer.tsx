type DrawerProps = {
    isOpen: boolean,
    onClose: () => void
}
export default function Drawer({ isOpen, onClose }: DrawerProps) {
    return (
        <div>
            <button onClick={onClose}>
                Close
            </button>
        </div>
    )
}