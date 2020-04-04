package it.phibonachos.teti.datasource.model.teti;

import javax.persistence.*;

@Entity
@Table(name = "Address", schema = "teti")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "AddressID")
    private long id;
    @Column(name = "Street")
    private String street;
    @Column(name = "StreetNumber")
    private String streetNumber;
    @Column(name = "ZipCode")
    private String zipCode;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
