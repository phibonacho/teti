package it.phibonachos.teti.datasource.model.sec;

import javax.persistence.*;

@Entity
@Table(name = "User", schema = "sec")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private long id;

    @Column(name = "Username", unique = true)
    private String username;

    @Column(name = "Password")
    private String password;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns({
            @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    })
    private Role role;

    @Column(name = "Active")
    private boolean active;

    public User() {}

    public User(String username, String password, Role role, boolean active) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.active = active;
    }

    @Transient
    private String passwordConfirm;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
