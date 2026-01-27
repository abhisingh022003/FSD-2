import Dropdown from "@mui/material/Select";
export default function basicdropdown() {
    return(
        <>
        <Dropdown native>
            <option aria-label="None" value="" />
            <option value={10}>Option 1</option>
            <option value={20}>Option 2</option>
            <option value={30}>Option 3</option>
        </Dropdown>
        </>
    )
}