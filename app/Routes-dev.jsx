import React from "react";

import { Router, Route, IndexRoute, browserHistory, hashHistory } from "react-router/es";
import willTransitionTo from "./routerTransition";
import App from "./App";

// Components imported here for react hot loader (does not work with async route loading)
import DashboardContainer from "./components/Dashboard/DashboardContainer";
import Witnesses from "./components/Explorer/Witnesses";
import CommitteeMembers from "./components/Explorer/CommitteeMembers";
import FeesContainer from "./components/Blockchain/FeesContainer";
import StatisticsContainer from "./components/Explorer/StatisticsContainer";
import BlocksContainer from "./components/Explorer/BlocksContainer";
import AssetsContainer from "./components/Explorer/AssetsContainer";
import AccountsContainer from "./components/Explorer/AccountsContainer";
import Explorer from "components/Explorer/Explorer";
import AccountPage from "./components/Account/AccountPage";
import AccountOverview from "./components/Account/AccountOverview";
import AccountAssets from "./components/Account/AccountAssets";
import {AccountAssetCreate} from "./components/Account/AccountAssetCreate";
import AccountAssetUpdate from "./components/Account/AccountAssetUpdate";
import AccountMembership from "./components/Account/GXBAccountMembership";
import AccountVesting from './components/Account/AccountVesting'
import AccountPermissions from "./components/Account/AccountPermissions";
import AccountWhitelist from "./components/Account/AccountWhitelist";
import AccountVoting from "./components/Account/AccountVoting";
import GXBMerchantVerify from './components/Account/GXBMerchantVerify';
import GXBDataSourceVerify from './components/Account/GXBDataSourceVerify';


import DataMarket from "./components/DataMarket/DataMarket"
import DataMarketDetail from "./components/DataMarket/DataMarketDetail"
import LeagueDetail from "./components/DataMarket/LeagueDetail"

import Transfer from "./components/Transfer/Transfer";
import SettingsContainer from "./components/Settings/SettingsContainer";
import BlockContainer from "./components/Blockchain/BlockContainer";
import AssetContainer from "./components/Blockchain/AssetContainer";
import CreateAccount from "./components/Account/CreateAccount";
import {ExistingAccount, ExistingAccountOptions} from "./components/Wallet/ExistingAccount";
import { WalletCreate , CreateWalletFromBrainkey } from "./components/Wallet/WalletCreate";
import ImportKeys from "./components/Wallet/ImportKeys";
import Invoice from "./components/Transfer/Invoice";
import {BackupCreate, BackupRestore} from "./components/Wallet/Backup";
import WalletChangePassword from "./components/Wallet/WalletChangePassword";
import {WalletManager, WalletOptions, ChangeActiveWallet, WalletDelete} from "./components/Wallet/WalletManager";
import BalanceClaimActive from "./components/Wallet/BalanceClaimActive";
import BackupBrainkey from "./components/Wallet/BackupBrainkey";
import Brainkey from "./components/Wallet/Brainkey";
import Help from "./components/Help";
import InitError from "./components/InitError";

const history = __HASH_HISTORY__ ? hashHistory : browserHistory;

class Auth extends React.Component {
    render() {return null; }
}

export default class Routes extends React.Component {
    render() {
        return <Router history={history} routes={routes} />;
    }
}

const routes = (
    <Route path="/" component={App} onEnter={willTransitionTo}>
        <IndexRoute component={DashboardContainer}/>
        <Route path="/auth/:data" component={Auth}/>
        <Route path="/dashboard" component={DashboardContainer}/>
        <Route path="explorer" component={Explorer}/>
        <Route path="/explorer/statistics" component={StatisticsContainer} />
        <Route path="/explorer/fees" component={FeesContainer} />
        <Route path="/explorer/blocks" component={BlocksContainer} />
        <Route path="/explorer/assets" component={AssetsContainer} />
        <Route path="/explorer/accounts" component={AccountsContainer} />
        <Route path="/explorer/witnesses" component={Witnesses} />
        <Route path="/explorer/committee-members" component={CommitteeMembers} />

        <Route path="wallet" component={WalletManager} >
            {/* wallet management console */}
            <IndexRoute component={WalletOptions} />
            <Route path="change" component={ChangeActiveWallet} />
            <Route path="change-password" component={WalletChangePassword} />
            <Route path="import-keys" component={ImportKeys} />
            <Route path="brainkey" component={ExistingAccountOptions} />
            <Route path="create" component={WalletCreate} />
            <Route path="delete" component={WalletDelete} />
            <Route path="backup/restore" component={BackupRestore} />
            <Route path="backup/create" component={BackupCreate} />
            <Route path="backup/brainkey" component={BackupBrainkey} />
            <Route path="balance-claims" component={BalanceClaimActive} />
        </Route>

        <Route path="data-market" component={DataMarket} >
            <IndexRoute component={DataMarket}></IndexRoute>
            <Route path="Free/:id" component={DataMarketDetail}></Route>
            <Route path="League/:id" component={LeagueDetail}></Route>
        </Route>

        <Route path="create-wallet" component={WalletCreate} />
        <Route path="create-wallet-brainkey" component={CreateWalletFromBrainkey} />

        <Route path="transfer" component={Transfer}/>

        <Route path="invoice/:data" component={Invoice} />
        <Route path="settings" component={SettingsContainer} />
        <Route path="block/:height" component={BlockContainer} />
        <Route path="asset/:symbol" component={AssetContainer} />
        <Route path="create-account" component={CreateAccount} />

        <Route path="existing-account" component={ExistingAccount} >
            <IndexRoute component={BackupRestore} />
            <Route path="import-backup" component={ExistingAccountOptions} />
            <Route path="import-keys" component={ImportKeys} />
            <Route path="brainkey" component={Brainkey} />
            <Route path="balance-claim" component={BalanceClaimActive} />
        </Route>

        <Route path="/account/:account_name" component={AccountPage} >
            <IndexRoute component={AccountOverview} />
            <Route path="overview" component={AccountOverview} />
            <Route path="assets" component={AccountAssets} />
            <Route path="create-asset" component={AccountAssetCreate} />
            <Route path="update-asset/:asset" component={AccountAssetUpdate} />
            <Route path="member-stats" component={AccountMembership} />
            <Route path="vesting" component={AccountVesting} />
            <Route path="permissions" component={AccountPermissions} />
            <Route path="voting" component={AccountVoting} />
            {/*<Route path="deposit-withdraw" component={GXBAccountDepositWithdraw} />*/}
            {/*<Route path="orders" component={AccountOrders} />*/}
            <Route path="whitelist" component={AccountWhitelist} />
            <Route path="merchant-verify" component={GXBMerchantVerify}></Route>
            <Route path="data-source-verify" component={GXBDataSourceVerify}></Route>
        </Route>

        <Route path="/init-error" component={InitError} />
        {/*<Route path="/help" component={Help} >
            <Route path=":path1" component={Help} >
                <Route path=":path2" component={Help} >
                    <Route path=":path3" component={Help} />
                </Route>
            </Route>
        </Route>*/}
    </Route>
);
