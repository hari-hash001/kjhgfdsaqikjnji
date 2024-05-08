import React from "react";
import './InternalServerError.scss'
import $ from 'jquery';
 
const InternalServerError = () => {
    $(function() {
        setTimeout(function(){
          $('body').removeClass('loading');
        }, 1000);
      });
     
    return (
      <div className="container">
        <h1>500</h1>
  {/* <h2>Unexpected Error <b>:(Please Contact System Admin)</b></h2> */}
  <h2>Internal Server Error <b>:(Please Contact System Admin)</b></h2>
 
  <div class="gears">
    <div class="gear one">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="gear two">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="gear three">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>
      </div>
    );
}
 
export default InternalServerError;