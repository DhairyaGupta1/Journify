const customStyles = {
    background: "linear-gradient(145deg, rgb(205, 227, 249) 0%, rgb(232, 239, 243) 55%, rgb(213, 189, 222) 100%)",
    fontWeight: "600",
    color: "#055791", 
    minWidth: "100vw", 
    display:"flex", 
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: "10px", 
    paddingBottom: "10px"
};

function Footer(){
    return(
    <div className="container" style={customStyles}>
        <span><h5>2023 SB FlightConnect - &copy; All rights reserved</h5></span>

    </div>
    );
}

export default Footer;