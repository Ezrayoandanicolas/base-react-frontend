import DataGrid, {
    Column,
    Editing,
    Popup,
    Scrolling, Pager, Paging,
    Form,
    FilterRow,
    GroupPanel,
  } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import 'devextreme-react/tag-box';
import 'devextreme-react/text-box';
import AxiosConfig from '../../AxiosConfig';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Users = () => {
    const { axios, setAuthToken } = AxiosConfig
    const cookies = new Cookies()

    const [formAdd, setFormAdd] = useState(false)

    const [userData, setUserData] = useState(null)
    const [userRoles, setUserRoles] = useState(null)
    const [userPermissions, setUserPermissions] = useState(null)

    const [addUser, setAddUser] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetchData();
    }, [refresh]);

    
    async function fetchData() {
        let isMounted = true;
        setAuthToken(cookies.get('Authorization'));
        try {
            const resUsers = await axios.get('v1/auth/getUsers');
            const resRoles = await axios.get('v1/auth/getRoles');
            const resPermissions = await axios.get('v1/auth/getPermissions');
            const resAuthPermissions = await axios.get('v1/auth/checkPermission');
            if (isMounted) {
                // console.log(resUsers.data.data)
                // console.log(resPermissions.data.data)
                setUserData(resUsers.data.data);
                setUserRoles(resRoles.data.data);
                setUserPermissions(resPermissions.data.data);

                const permissionsDefault = resAuthPermissions.data.data.roles[0].permissions
                const permissionsCustom = resAuthPermissions.data.data.permissions
                setAddUser(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'create-user') : permissionsDefault.some(perm => perm.name === 'create-user'));
                setEditUser(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'edit-user') : permissionsDefault.some(perm => perm.name === 'edit-user'));
                setDeleteUser(permissionsCustom.length > 0 ? permissionsCustom.some(perm => perm.name === 'delete-user') : permissionsDefault.some(perm => perm.name === 'delete-user'));

                return () => {
                    isMounted = false;
                }; // Panggil fungsi fetchData saat komponen dimount
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Fungsi untuk menyimpan perubahan
    const saveChanges = (e) => {
        setFormAdd(false)
        console.log(e.newData)
        const updatedData = e.newData;

        setAuthToken(cookies.get('Authorization'));
        axios.post('v1/auth/updateUser/'+e.oldData.id, updatedData)
        .then((res) => {
            console.log('Success', res.data)
            MySwal.fire({
                text: 'Update User Berhasil',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
            setRefresh(!refresh);
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            MySwal.fire({
                text: 'Update User Gagal!',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
        });
    } 

    
    const createUsers = (e) => {
        console.log(e)
        const updatedData = e.data;
        
        setAuthToken(cookies.get('Authorization'));
        axios.post('v1/auth/createUser', updatedData)
        .then((res) => {
            console.log('Success', res.data)
            setRefresh(!refresh);
            MySwal.fire({
                text: 'Buat User Baru Berhasil',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            MySwal.fire({
                text: 'Gagal Buat User Baru!',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
        });
    } 

    const destoryUser = (e) => {
        console.log(e)

        setAuthToken(cookies.get('Authorization'));
        axios.delete('v1/auth/deleteUser/'+e.data.id)
        .then((res) => {
            console.log('Success', res.data)
            setRefresh(!refresh);
            MySwal.fire({
                text: 'Berhasil Hapus User',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            MySwal.fire({
                text: 'Gagal Hapus User!',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
        });
    } 

    const enableEdit = () => {
        setFormAdd(true)
    }

    const disableEdit = () => {
        setFormAdd(false)
    }
    

    return (
        <>
            <div className='container mt-20 m-auto' id="data-grid-users">
                <div className="flex">
                    <div className="max-w-md text-white rounded-lg bg-blue-500 overflow-hidden shadow-md">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Informasi Roles</h2>
                            <p className="">Admin (all Permissions)</p>
                            <p className="">Editor (View, Create, Edit Post)</p>
                            <p className="">Member (View, Create Post)</p>
                        </div>
                    </div>
                    <div className="max-w-md text-white rounded-lg bg-blue-500 overflow-hidden shadow-md ml-2">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Informasi Permissions</h2>
                            <p className="">Create, Edit, Delete User</p>
                            <p className="">View, Create, Edit Post</p>
                        </div>
                    </div>
                </div>
                <DataGrid
                    // keyExpr='id'
                    dataSource={userData}
                    showBorders={true}
                    allowColumnReordering={true}
                    // defaultColumns={columns}
                    onRowUpdating={saveChanges}
                    onRowInserting={createUsers}
                    onRowRemoved={destoryUser}
                    onInitNewRow={enableEdit}
                    onEditingStart={disableEdit}
                    >
                    <GroupPanel visible={true} />
                    <FilterRow visible={true} />
                    <Scrolling rowRenderingMode='virtual'></Scrolling>
                    <Paging defaultPageSize={5} />
                    <Pager
                        visible={true}
                        allowedPageSizes={[5, 10, 50, 'all']}
                        displayMode="full"
                        showPageSizeSelector={true}
                        showInfo={true}
                        showNavigationButtons={true} />
                    <Editing
                        mode="popup"
                        allowUpdating={editUser}
                        allowAdding={addUser}
                        allowDeleting={deleteUser}>
                        <Popup title="Users Info" showTitle={true} width={700} height={525} />
                        <Form>
                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="username" caption='Username' />
                                <Item dataField="email" caption='E-Mail' />
                                <Item dataField="name" caption='Full Name' />
                                <Item
                                    dataField="password"
                                    caption="Password"
                                    editorType='dxTextBox'
                                    editorOptions={{
                                        mode: 'password'
                                    }}
                                />
                            </Item>

                            <Item itemType="group" caption="Edit Roles" colCount={2} colSpan={2}>
                                    <Item
                                        dataField="roles"
                                        caption="Role"
                                        editorType="dxSelectBox"
                                        editorOptions={{
                                            dataSource: userRoles,
                                            displayExpr: "name",
                                            valueExpr: "name",
                                        }}
                                    >
                                    </Item>
                            </Item>
                            <Item itemType="group" caption="Edit Permissions" colCount={2} colSpan={2}>
                                <Item
                                    dataField="permissions"
                                    editorType='dxTagBox'
                                    editorOptions={{
                                        dataSource: userPermissions,
                                        displayExpr: "name",
                                        valueExpr: "id",
                                        showSelectionControls: true,
                                        multiline: true,
                                        selectAllMode: "allPages",
                                    }}
                                    ></Item>
                            </Item>
                        </Form>
                    </Editing>
                    <Column dataField="username" caption='Username' allowEditing={formAdd} width={500} />
                    <Column dataField="email" caption='E-Mail' allowEditing={formAdd}/>
                    <Column dataField="name" caption='Full Name' />
                    <Column
                        dataField="roles"
                            caption="Role"
                            width={125}
                            calculateDisplayValue={data => {
                                if (data && data.roles && data.roles.length > 0) {
                                return data.roles[0].name;
                                } else {
                                return "No Role";
                                }
                            }}>
                    </Column>
                    <Column dataField="permissions" caption='Permissions' visible={false} />
                    <Column dataField="password" caption='Password' visible={false} />
                </DataGrid>
            </div>
        </>
    )
}

export default Users