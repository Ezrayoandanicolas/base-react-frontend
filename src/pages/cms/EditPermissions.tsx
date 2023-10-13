import { DxCheckBox } from "devextreme-react/check-box";

function EditPermissions({ userPermissions, selectedPermissions, onPermissionChange }) {
  return (
    <div>
      {userPermissions.map((permission) => (
        <div key={permission.id}>
          <DxCheckBox
            value={selectedPermissions.includes(permission.id)}
            onValueChanged={(e) => onPermissionChange(permission.id, e.value)}
          />
          {permission.name}
        </div>
      ))}
    </div>
  );
}

export default EditPermissions;