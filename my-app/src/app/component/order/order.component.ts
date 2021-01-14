
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../core/http.service';
import { HttpParams, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  validateForm!: FormGroup;
  unitOfQuantity: string = '盒';
  haveTransportationFee : boolean = false;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  
  }

  goodsTypeChange(): void{
    console.log("9999"+this.validateForm.controls['goodsType'].value)
    if(this.validateForm.controls['goodsType'].value == 40)
      this.validateForm.controls['price'].setValue(this.haveTransportationFee ? 5 : 6.5);
    if(this.validateForm.controls['goodsType'].value == 50)
      this.validateForm.controls['price'].setValue(this.haveTransportationFee ? 6 : 7.5);
    if(this.validateForm.controls['goodsType'].value == 60)
     this.validateForm.controls['price'].setValue(this.haveTransportationFee ? 7 : 8.5);
    if(this.validateForm.controls['goodsType'].value == 70)
      this.validateForm.controls['price'].setValue(this.haveTransportationFee ? 8 : 8.5);
    if(this.validateForm.controls['goodsType'].value == 80)
      this.validateForm.controls['price'].setValue(this.haveTransportationFee ? 9 : 9.5);
    console.log( this.validateForm.controls['price'].value)
    this.totalNumChange();
  }

  packageTypeChange():void{
    if(this.validateForm.controls['packageType'].value == 1){
      this.unitOfQuantity = '盒(每盒8斤,带盒重量)';
      this.validateForm.controls['totalNum'].setValue(1);
      //if(!this.haveTransportationFee) this.validateForm.controls['totalPrice'].setValue(this.validateForm.controls['price'].value * 8);
    }else{
      this.unitOfQuantity = 'kg,3kg(6斤)起购';
      this.validateForm.controls['totalNum'].setValue(3);
     // if(!this.haveTransportationFee) this.validateForm.controls['totalPrice'].setValue(this.validateForm.controls['price'].value * 6);
    }
    this.totalNumChange();
  }

  totalNumChange(): void{
    console.log("<><><><><><>totalnumchange"+this.validateForm.controls['totalNum'].value)
    //1. 计算商品总重量
    let totalweight= 0;
    if(this.validateForm.controls['packageType'].value == 1) {// 1-盒装 2-散装
      totalweight = this.validateForm.controls['totalNum'].value*8; // 一盒是8斤
    }else{
      totalweight = this.validateForm.controls['totalNum'].value*2;
    }
    //2. 设定商品总价格
    let price = this.validateForm.controls['price'].value;
    let goodsTotalPrice = price * totalweight;
    this.validateForm.controls['goodsFee'].setValue(goodsTotalPrice);
    //3. 计算运费价格： 货品运费
    let goodsTransportationFee = totalweight%2==0 ? totalweight/2*3 : (totalweight+1)/2*3;   
    // let packageFee = 0;// 小于32斤统一收费： 集装箱6元+多出重量运费2元 = 8元
    // if(totalweight<=48){
    //   packageFee = 8;
    // }else{
    //   totalweight%32 == 0 ? totalweight/32*8 :  totalweight/32*8+8;
    // }
    if(!this.haveTransportationFee){
      console.log("000000000000"+totalweight+"99999999999"+price)
      this.validateForm.controls['totalPrice'].setValue(totalweight*price);
    }else{
      this.validateForm.controls['transportationFee'].setValue(goodsTransportationFee);
      this.validateForm.controls['totalPrice'].setValue(goodsTotalPrice+goodsTransportationFee);
      this.validateForm.controls['totalPriceDes'].setValue('购买'+totalweight+'斤 * '+price+'元/斤= '+(totalweight*price)+'元 + 运费 '+(goodsTransportationFee)+'元 = '+(goodsTotalPrice+goodsTransportationFee)+'元');
    }
    
    
  }
  
  constructor(private fb: FormBuilder,  private httpService: HttpService,) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      goodsType: [null, [ Validators.required]],
      price: [null, [Validators.required]] ,
      totalNum:  [null, [ Validators.required]],
      transportationFee: [null, [ Validators.required]],
      totalPrice:[null, [ Validators.required]],
      packageType: [null, [ Validators.required]],
      totalPriceDes:  ['', [ Validators.required]],
      goodsFee:  [null, [ Validators.required]],
    });
    
  }

}
