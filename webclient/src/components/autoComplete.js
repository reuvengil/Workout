import { Component } from "react";
export default class AutoComplete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            data: props.data,
            hint: props.hint,
            disabled: props.disabled,
            callbackOnSelection: props.callbackOnSelection,
            text: '',
            dataFiltered: [],
        }
        this.selection = -1;
    }
    setFocus() {
        window.setTimeout(() => {
            document.getElementById(this.state.id).focus({});
        }, 0);
    }
    handlekeyDown(itemslist, e) {
        var keyCode = e.keyCode
        if ((keyCode === 38 || keyCode === 40) && this.selection === -1) {
            this.selection = 0;
            itemslist[0].setAttribute('class', 'autocomplete-active');
            return;
        }
        switch (keyCode) {
            case 40:
                this.selection = (this.selection + 1) % itemslist.length;
                itemslist[this.selection].setAttribute('class', 'autocomplete-active');
                break;
            case 38:
                this.selection = (this.selection - 1 === -1) ?
                    (itemslist.length - 1) : this.selection - 1;
                itemslist[this.selection].setAttribute('class', 'autocomplete-active');
                break;
            case 13:
                e.preventDefault();
                if (this.selection === -1) return;
                this.setState({
                    text: this.state.dataFiltered[this.selection].name,
                    dataFiltered: [],
                });
                this.state.callbackOnSelection(this.state.dataFiltered[this.selection])
                break;
            default: break;
        }
    }
    render() {
        return (
            <div className="autocomplete" style={{
                width: '300px',
            }}>
                <input id={this.state.id}
                    type="text"
                    value={this.state.text}
                    placeholder={this.state.hint}
                    disabled={this.state.disabled}
                    onChange={(e) => {
                        this.setState({
                            text: e.target.value,
                            dataFiltered: this.state.data
                                .filter(w => w.name.toLowerCase().startsWith(e.target.value.toLowerCase())),
                        })
                        if (this.state.dataFiltered.length === 0) {
                            this.selection = -1;
                        }
                    }}
                    onKeyDown={(e) => {
                        var x = document.getElementById(`${this.state.id}autocomplete-list`);
                        if (x) {
                            // remove children class
                            for (let i = 0; i < x.children.length; i++) {
                                x.children[i].setAttribute('class', '');
                            }
                            //paint the selected item
                            this.handlekeyDown(x.children, e);
                        }
                    }}
                >
                </input>
                {(this.state.dataFiltered.length > 0 && this.state.text.length > 0) ?
                    <div id={`${this.state.id}autocomplete-list`} className="autocomplete-items">
                        {this.state.dataFiltered.map((item) => {
                            return <div
                                key={item.name}
                                onClick={() => {
                                    this.setState({
                                        text: item.name,
                                        dataFiltered: [],
                                    });
                                    this.state.callbackOnSelection(item)
                                }}
                            ><strong>{item.name[0].toUpperCase()}</strong>{item.name.toLowerCase().substring(1)}
                            </div>
                        })}
                    </div> : null}
            </div>
        )
    }
}