function ReservationOption({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {

  return (
    <>
      <div style={{padding: '150px'}}></div>
      {rsvnInfo.selectedProduct.type}<br></br>
      {rsvnInfo.selectedProduct.name}
    </>
  )
}

export default ReservationOption