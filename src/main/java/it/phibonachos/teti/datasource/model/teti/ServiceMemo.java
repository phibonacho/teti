package it.phibonachos.teti.datasource.model.teti;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "ServiceMemo", schema = "teti")
public class ServiceMemo {
    @Id @GeneratedValue
    @Column(name = "MemoID")
    private long id;

    @Column(name = "MemoTitle")
    private String memoTitle;

    @Column(name = "MemoContent")
    private String memoContent;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "ServiceID")
    @JsonIgnore
    private Service service;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMemoTitle() {
        return memoTitle;
    }

    public void setMemoTitle(String memoTitle) {
        this.memoTitle = memoTitle;
    }

    public String getMemoContent() {
        return memoContent;
    }

    public void setMemoContent(String memoContent) {
        this.memoContent = memoContent;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}
