import React from "react";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Modal from "react-foundation-apps/src/modal";
import Trigger from "react-foundation-apps/src/trigger";
import BalanceComponent from "../Utility/BalanceComponent";
import FormattedAsset from "../Utility/FormattedAsset";
import { ChainStore } from "gxbjs/es";
import BindToChainState from "../Utility/BindToChainState";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import { Tabs, Tab } from "../Utility/Tabs";
import ChainTypes from "../Utility/ChainTypes";
import utils from "common/utils";
import ConfirmModal from "./ConfirmModal";
import SettingsActions from "actions/SettingsActions";
import AccountActions from "actions/AccountActions";
import notify from "actions/NotificationActions";
import AccountStore from "stores/AccountStore";
import AccountSelect from "../Forms/AccountSelect";
import LinkToWitnessById from "../Blockchain/LinkToWitnessById";

class StakingClaimModal extends React.Component {
    static propTypes = {
        globalObject: ChainTypes.ChainObject.isRequired,
        onFinish: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        globalObject: "2.0.0"
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",
            trustNodeId: "",
            ownerId: "",
            stakingDays: "",
            amount: "",
            trustNode: ""
        };
    }

    componentDidMount() {
        let modalId = "modal-claim-staking";
        ZfApi.subscribe(modalId, (msg, data) => {
            if (data == "close") {
                ZfApi.publish("modal-confirm-staking", "close");
            }
        });
    }

    show(stakingId, ownerId, stakingDays, amount, trustNode, fee) {
        let modalId = "modal-claim-staking";
        this.setState({
            error: "",
            stakingId: stakingId,
            ownerId: ownerId,
            stakingDays: stakingDays,
            amount: amount,
            trustNode: trustNode,
            fee: fee
        });
        ZfApi.publish(modalId, "open");
    }

    _handleChange(e) {
        let amount = e.target.value;
        this.setState({
            amount: amount.trim().replace(/,/g, "")
        });
    }

    submit() {
        let self = this;
        self.setState({
            loading: true
        });
        AccountActions.claimStaking(
          this.state.ownerId,
          this.state.stakingId
      )
      .then(function(resp) {
          self.props.onFinish();
          let msg = counterpart.translate("staking_program.claim_success");
          notify.addNotification({
              message: msg,
              level: "success",
              autoDismiss: 10
          });
          ZfApi.publish("modal-claim-staking", "close");
          self.setState({
              loading: false
          });
      })
      .catch((ex) => {
          self.setState({
              loading: false
          });
          let error_msg = ex;
          if (typeof ex == "object") {
              error_msg =
            ex.message &&
            ex.message.indexOf(
              "create_date_time.sec_since_epoch() - _db.head_block_time().sec_since_epoch()"
            ) > -1
              ? `${counterpart.translate("staking_program.time_error")}\n${
                  ex.message
                }`
              : ex.message;
          }
          notify.addNotification({
              message: `${error_msg}`,
              level: "error",
              autoDismiss: 10
          });
      });
    }

    onChangeAccount(trustNodeName) {
        if (trustNodeName) {
            let trustNode = this.state.trustNodes.filter(
        (item) => item !== null && item.get("name") === trustNodeName
      );
            this.setState({
                trustNodeId: trustNode.get(0).get("id")
            });
        } else {
            this.setState({
                trustNodeId: ""
            });
        }
    }

    render() {
        let modalId = "modal-claim-staking";
        // let trustNodeName = ChainStore.getAccount(this.state.trustNode).get(
        //   "name"
        // );
        let button_text = counterpart.translate("staking_program.button_title");
        return (
          <Modal id={modalId} overlay={true} ref={modalId}>
            <Trigger close={modalId}>
              <a href="javascript:;" className="close-button">
                &times;
              </a>
            </Trigger>
            <div className="grid-block vertical container-loyalty-program">
              <Translate component="h3" content="staking_program.claim_title" />
            </div>
            <div>
              <table className="table key-value-table">
                <tbody>
                  <tr>
                    <td>
                      <Translate content="staking_program.account" />
                    </td>
                    <td>
                      <LinkToWitnessById witness={this.state.trustNode} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Translate content="staking_program.staking_amount" />
                    </td>
                    <td>
                      <span>{this.state.amount}GXC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Translate content="staking_program.term" />
                    </td>
                    <td>
                      <span>
                        {counterpart.translate("staking_program.day", {
                            day: this.state.stakingDays
                        })}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Translate content="staking_program.fee" />
                    </td>
                    <td>{this.state.fee}GXC</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div className="text-center">
                <button
                  style={{ margin: ".2rem" }}
                  onClick={this.submit.bind(this)}
                  className={`button ${this.state.loading ? "disabled" : ""}`}
                  dangerouslySetInnerHTML={{ __html: button_text }}></button>
              </div>
            </div>
          </Modal>
        );
    }
}

export default BindToChainState(StakingClaimModal, { keep_updating: true });
