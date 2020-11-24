package it.phibonachos.teti.datasource.model.sec;

import javax.persistence.*;

@Entity
@Table(name = "Role", catalog = "sec")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoleID", updatable = false)
    private long roleId;

    @Column(name = "RoleName", unique = true, updatable = false)
    private String roleName;

    @Column(name = "Description", length = 256)
    private String description;

    public Role(String roleName, String description) {
        this.roleName = roleName;
        this.description = description;
    }

    public Role() {

    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
