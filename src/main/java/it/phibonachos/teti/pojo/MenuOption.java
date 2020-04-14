package it.phibonachos.teti.pojo;

import java.util.List;

public class MenuOption {
    public enum Status {
        NYI("status.development"), ALPHA("status.alpha"), BETA("status.beta"), DONE("DONE");

        private final String displayValue;

        private Status(String displayValue) {
            this.displayValue = displayValue;
        }

        public String getDisplayValue() {
            return displayValue;
        }
    }

    private String name;
    private List<String> options;
    private Status status;

    public MenuOption(String name, Status status, String... options) {
        this.name = name;
        this.options = List.of(options);
        this.status = status;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
