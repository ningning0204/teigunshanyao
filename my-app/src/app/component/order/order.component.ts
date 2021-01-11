
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  validateForm!: FormGroup;
  unitOfQuantity: string = '盒';

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  goodsTypeChange(): void{
    console.log("9999"+this.validateForm.controls['goodsType'].value)
    if(this.validateForm.controls['goodsType'].value == 40)
      this.validateForm.controls['price'].setValue(5);
    if(this.validateForm.controls['goodsType'].value == 50)
      this.validateForm.controls['price'].setValue(6);
    if(this.validateForm.controls['goodsType'].value == 60)
     this.validateForm.controls['price'].setValue(7);
    if(this.validateForm.controls['goodsType'].value == 70)
      this.validateForm.controls['price'].setValue(7);
    if(this.validateForm.controls['goodsType'].value == 80)
      this.validateForm.controls['price'].setValue(8);
    console.log( this.validateForm.controls['price'].value)
  }

  packageTypeChange():void{
    if(this.validateForm.controls['packageType'].value == 1)
      this.unitOfQuantity = '盒';
    else
      this.unitOfQuantity = 'kg(公斤)';
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
    let goodsTotalPrice = this.validateForm.controls['price'].value * totalweight;
    this.validateForm.controls['goodsFee'].setValue(goodsTotalPrice);
    //3. 计算运费价格： 货品运费+包装费
    let goodsTransportationFee = totalweight%2==0 ? totalweight : totalweight+1;   
    let packageFee = 0;// 小于32斤统一收费： 集装箱6元+多出重量运费2元 = 8元
    if(totalweight<=32){
      packageFee = 8;
    }else{
      totalweight%32 == 0 ? totalweight/32*8 :  totalweight/32*8+8;
    }
    this.validateForm.controls['transpototalPricertationFee'].setValue(goodsTransportationFee+packageFee);
    this.validateForm.controls['totalNum'].setValue(goodsTotalPrice+goodsTransportationFee+packageFee)
    
  }
  
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      goodsType: [null, [ Validators.required]],
      price: [null, [Validators.required]] ,
      totalNum:  [null, [ Validators.required]],
      transportationFee: [null, [ Validators.required]],
      totalPrice:[null, [ Validators.required]],
      packageType: [null, [ Validators.required]],
      totalPriceDes:  [null, [ Validators.required]],
      goodsFee:  [null, [ Validators.required]],
    });
    this.validateForm.controls['goodsType'].setValue(50);
    this.validateForm.controls['price'].setValue(6);
    this.validateForm.controls['totalNum'].setValue(0);
    this.validateForm.controls['transportationFee'].setValue(0);
    this.validateForm.controls['totalPrice'].setValue(0);
    this.validateForm.controls['goodsFee'].setValue(0);
    this.validateForm.controls['packageType'].setValue(1);
    
  }

}
