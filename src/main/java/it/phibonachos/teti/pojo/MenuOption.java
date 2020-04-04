package it.phibonachos.teti.pojo;

import java.util.List;

public class MenuOption {
    private String name;
    private List<String> options;

    public MenuOption(String name, String... options) {
        this.name = name;
        this.options = List.of(options);
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
}
