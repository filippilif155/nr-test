import { ToggleButton } from 'primereact/togglebutton';

const SwitchButton = ({ checked, onChange }) => {
    return (
        <ToggleButton
            checked={checked}
            onChange={onChange}
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            onLabel="Frontend Validation ON"
            offLabel="Frontend Validation OFF"
        />
    );
};

export default SwitchButton;