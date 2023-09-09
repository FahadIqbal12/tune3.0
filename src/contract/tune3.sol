// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Tune3{

    struct song {
        address artist_address;
        uint256 song_id;
        string song_name;
        string ipfs_url;
        uint256 price;
     
    }
    struct buyer {
        address buyer_address;
        uint256 song_id;
        string song_name;
        string ipfs_url;
        address artist_address;
    }
    struct artist {
        address artist_address;
        uint256 song_id;
        string song_name;
        string ipfs_url;
    }

    mapping(uint256 => song)  Library;
    mapping(address => buyer[]) Purchases;
    mapping(address => artist[]) ArtistLib;

    function addSong(uint256 _song_id,string memory _song_name,string memory _ipfs_url, uint256 _price)public{
        song storage newSong = Library[_song_id];      
        newSong.artist_address = msg.sender;
        newSong.song_name = _song_name;
        newSong.ipfs_url = _ipfs_url;
        newSong.price = _price;
        ArtistLib[msg.sender].push(artist(msg.sender,_song_id,_song_name,_ipfs_url));
    }

    function buySong(uint256 _song_id)public payable{
        song storage Song = Library[_song_id];
        require(Song.artist_address != msg.sender,"Artists cannot buy their own song");
        require(Song.price == msg.value,"MSG Value not correct");
       Purchases[msg.sender].push(buyer(msg.sender,_song_id,Song.song_name,Song.ipfs_url,Song.artist_address));
      payable(Song.artist_address).transfer(Song.price);
       
    }

    function getPurchases()public view returns (buyer[] memory){
        return (Purchases[msg.sender]);
    }
    function getArtistSong()public view returns (artist[] memory){
        return (ArtistLib[msg.sender]);
    }
}