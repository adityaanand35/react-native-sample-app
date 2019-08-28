export default class AccountCreateConfig {
    static Forms = {
        basicInfoForm: 'basic',
        addressInfoForm: 'address',
        verifyIdentityInfoForm: 'verifyIdentity',
        financeInfoForm: 'finance',
        employmentInfoForm: 'employment',
        accountTypeSelectionForm: 'accountType',
        getSignatureForm: 'signature'
    }
       
    static FormSequence = [
        this.Forms.basicInfoForm,
        this.Forms.addressInfoForm,
        this.Forms.verifyIdentityInfoForm,
        this.Forms.financeInfoForm,
        this.Forms.accountTypeSelectionForm,
        this.Forms.getSignatureForm
    ]
}