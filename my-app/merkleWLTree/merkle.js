const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

//TODO: Replace this with a data base where we can pull from. Set up the backend api. 
export function verifyOnWl(_address){
    const WLAddresses = [
        "0x847d08e9Ab33C256E22180b5fc055b0828B8020f",
        "0x847d08e9Ab33C256E22180b5fc055b084865020f",
        "0x847d08e9Ab33C256E22180b5fc055b080656020f",
        "0x847d08e9Ab33C256E22180b5fc055b012312020f",
        "0x847d08e9Ab33C256E22180b5fc055b080123020f",
        "0x847d08e9Ab33C256E22180b5fc055b080821020f",
        "0x847d08e9Ab33C256E22180b5fc055b080812220f",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0x847d08e9Ab33C256E22180b5fc055b0808B8020f",
    ]
    const leaves = WLAddresses.map(addr => keccak256(addr));
    const tree = new MerkleTree(leaves, keccak256);
    const root = tree.getRoot().toString("hex");
    const leaf = keccak256(_address);
    const proof = tree.getHexProof(leaf)
    return {proof, root};
}
