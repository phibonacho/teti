package it.phibonachos.teti.datasource.model.teti;

import javax.persistence.*;

@Entity
@Table(name = "InvoiceSubject", schema = "teti")
public class InvoiceSubject {
    @Id @Column(name = "InvoiceSubjectID")
    private long id;

    @Column(name = "BusinessName")
    private String businessName;

    @Column(name = "BusinessName2")
    private String businessName2;

    @OneToOne @JoinColumn(name = "AddressID", nullable = false)
    private Address address;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Fax")
    private String fax;

    @Column(name = "MobilePhone")
    private String mobilePhone;

    @Column(name = "FiscalCode")
    private String fiscalCode;

    @Column(name = "VATCode")
    private String vatCode;

    @Column(name = "Withholding")
    private boolean withholding;

    @Column(name = "Note")
    private String note;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address addressId) {
        this.address = addressId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getFiscalCode() {
        return fiscalCode;
    }

    public void setFiscalCode(String fiscalCode) {
        this.fiscalCode = fiscalCode;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getBusinessName2() {
        return businessName2;
    }

    public void setBusinessName2(String businessName2) {
        this.businessName2 = businessName2;
    }

    public String getVatCode() {
        return vatCode;
    }

    public void setVatCode(String vatCode) {
        this.vatCode = vatCode;
    }

    public boolean isWithholding() {
        return withholding;
    }

    public void setWithholding(boolean withholding) {
        this.withholding = withholding;
    }
}
