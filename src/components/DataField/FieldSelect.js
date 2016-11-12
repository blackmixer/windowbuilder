import React, {Component, PropTypes} from "react";
import classes from "./DataField.scss";
import VirtualizedSelect from "react-virtualized-select";

export default class FieldSelect extends Component {

  static propTypes = {
    _obj: PropTypes.object.isRequired,
    _fld: PropTypes.string.isRequired,
    _meta: PropTypes.object,
    _hide_label: PropTypes.bool,
    handleValueChange: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      clearable: true,
      disabled: false,
      options: [],
      multi: false,
      searchable: true,
      selectedCreatable: null,
    }
  }

  _goToGithubUser (value) {
    window.open(value.html_url)
  }

  _loadOptions (input) {

    const selection = {_top: 40};
    if(input){
      selection.presentation = {like: input}
    }
    if(this.props._meta.choice_params){
      this.props._meta.choice_params.forEach(function (cp) {
        selection[cp.name] = cp.path
      })
    }

    return this.props._obj[this.props._fld]._manager.get_option_list(selection)
      .then((options) => {
        this.setState({ options })

        return { options: options }
      })
  }

  _onChange(value){
    this.setState({value})
    if(this.props.handleValueChange)
      this.props.handleValueChange(value)
  }

  render() {

    return (

      this.props._hide_label ?

        <VirtualizedSelect
          name={this.props._meta.name}
          async
          backspaceRemoves={false}
          labelKey='presentation'
          valueKey='ref'
          loadOptions={::this._loadOptions}
          minimumInput={0}
          onChange={::this._onChange}
          //onValueClick={this._goToGithubUser}
          options={this.state.options}
          value={this.state.value}

        />
        :
        <div className={classes.field}>
          <div className={classes.label}>{this.props._meta.synonym}</div>
          <div className={classes.dataselect}>
            <VirtualizedSelect
              name={this.props._meta.name}
              async
              backspaceRemoves={false}
              labelKey='presentation'
              valueKey='ref'
              loadOptions={::this._loadOptions}
              minimumInput={0}
              onChange={::this._onChange}
              //onValueClick={this._goToGithubUser}
              options={this.state.options}
              value={this.state.value}

            />
          </div>
        </div>

    );
  }
}

