package it.phibonachos.teti.datasource.model.teti;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "InvoiceSubject", schema = "teti")
public class InvoiceSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "InvoiceSubjectID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "AdminID")
    private Administrator administrator;

    @Column(name = "BusinessName")
    private String businessName;

    @Column(name = "BusinessName2")
    private String businessName2;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "AddressID", nullable = false)
    private Address address;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "ContractID")
    private Contract contract;


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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    @JsonIgnore
    public Administrator getAdministrator() {
        return administrator;
    }

    @JsonProperty
    public void setAdministrator(Administrator administrator) {
        this.administrator = administrator;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
}
