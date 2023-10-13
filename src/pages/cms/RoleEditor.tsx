import { SelectBox } from 'devextreme-react';

const RoleEditor = (props) => {
  const { data, value, onChange } = props;
  
  return (
    <SelectBox
      dataSource={data.userRoles}
      value={value && value.length > 0 ? value[0].id : null}
      onValueChanged={(e) => {
        // Mengirimkan perubahan nilai sebagai array dengan satu objek role
        onChange([{ id: e.value, name: data.userRoles.find(role => role.id === e.value).name }]);
      }}
      displayExpr="name"
      valueExpr="id"
    />
  );
};

export default RoleEditor;