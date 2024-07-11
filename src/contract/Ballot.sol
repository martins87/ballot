// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.8.0;

contract Ballot {
    struct Proposal {
        uint id;
        string title;
        string description;
        int votesFor;
        int votesAgainst;
        uint endtime;
        bool executed;
    }

    uint public proposalCount;
    mapping(uint => Proposal) proposals;
    mapping(uint => mapping(address => bool)) votes;

    constructor () {
        proposalCount = 0;
    }

    function createProposal(string memory _title, string memory _description) public {
        proposals[proposalCount] = Proposal(
            proposalCount,
            _title,
            _description,
            0,
            0,
            block.timestamp + 1 weeks,
            false
        );
        proposalCount++;
    }

    function viewProposal(uint _proposalId) public view returns (string memory title, string memory description, int votesFor, int votesAgainst, uint endtime) {
        Proposal storage proposal = proposals[_proposalId];
        title = proposal.title;
        description = proposal.description;
        votesFor = proposal.votesFor;
        votesAgainst = proposal.votesAgainst;
        endtime = proposal.endtime;
    }

    function vote(uint _proposalId, bool _support) public {
        // TODO validate input _proposalId
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.endtime, "Voting period has ended");
        require(votes[_proposalId][msg.sender] == false, "User cannot vote twice on this proposal");

        if(_support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }

        votes[_proposalId][msg.sender] = _support;
    }

    // TODO create execute function
    // After voting period the proposal must be ended and votes cannot be accepted
}