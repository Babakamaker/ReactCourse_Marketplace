import { ChangeEvent } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UsersTableProps {
  userList: User[];
  editUser: User | null;
  onUserDelete: (id: number) => void;
  onEditButtonClick: (user: User) => void;
  onCancelEditUser: () => void;
  onUserFieldChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSaveUserButtonClick: () => void;
}

const UserTable = ({
  userList,
  editUser,
  onUserDelete,
  onEditButtonClick,
  onUserFieldChange,
  onSaveUserButtonClick,
  onCancelEditUser,
}: UsersTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              {editUser?.id === user.id ? (
                <input
                  type="text"
                  value={editUser.firstName}
                  onChange={(event) => onUserFieldChange(event, user.id)}
                />
              ) : (
                user.firstName
              )}
            </td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <div style={{ display: "flex", gap: "1em" }}>
                {editUser?.id === user.id ? (
                  <>
                    <button onClick={onSaveUserButtonClick}>Save</button>
                    <button onClick={onCancelEditUser}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => onEditButtonClick(user)}>Edit</button>
                    <button onClick={() => onUserDelete(user.id)}>Delete</button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
