const PC_NM_Pool_Mailer=`SELECT B.vcbrand BRAND,      
C.vcName DEALER,D.work_location LOCATION, d.EMO_Code DEALERCODE, h.CityName CITY, g.StateName STATE,       
''''+A.PARTNUMBER1 Partnumber,      
F.partdesc DESCRIPTION,      
F.Category PARTTYPE,      
ISNULL(F.MRP,0) MRP,      
ISNULL(F.landedcost,0) NDP,      
--F.MOQ,      
--F.MODEL 'Model',
isnull(A.DISCOUNT,0) 'Discount' ,      
(ISNULL(F.MRP,0)-ISNULL(F.MRP,0)*A.DISCOUNT*.01) as 'Discounted Unit Price',      
A.AUTOREMOVAL 'Removal Flag',
a.REASON 'Reason Of Removal',      
X2.qty 'Latest Stock Qty',      
CONVERT(VARCHAR(20), X1.stockdate,106) 'Latest Stock Date',      
CASE WHEN A.DISCOUNT>=0 AND  A.DISCOUNT<15 THEN '0-14%'  WHEN A.DISCOUNT>=15 AND  A.DISCOUNT<25 THEN '15-24%'  WHEN A.DISCOUNT>=25 AND  A.DISCOUNT<35 THEN '25-34%'  
WHEN A.DISCOUNT>=35 AND  A.DISCOUNT<=50 THEN '35-50%'  WHEN A.DISCOUNT>50  THEN '51% or higher%' END 'Discount Slab',      
ROUND(ISNULL(X2.QTY,0)*ISNULL(F.landedcost,0),2)'PARTVALUE(NDP)',
--A.SCSVERIFIED SCSVerified,      
--A.DEALERVERIFIED DealerVerified,    
---- added below 3 columns as per manish sir 10 dec 24  
coalesce(a.UpdatedDate,a.addeddate) as UpdatedDate

FROM SH_UPLOADNONMOVINGPART A       
 INNER JOIN Brand_Master B(NOLOCK) ON(A.BRANDID = B.bigid)       
 LEFT JOIN SH_BrandBlockListUpload BB (NOLOCK) ON (A.PARTNUMBER=BB.Partnumber)      
 INNER JOIN Dealer_Master C(NOLOCK) ON(A.DEALERID = C.bigid) 
 INNER JOIN Dealer_Workshop_Master D(NOLOCK) ON(A.LOCATIONID = D.bigid)       
 LEFT JOIN  CurrentStock1 X1(NOLOCK) ON(A.LOCATIONID = X1.LOCATIONID)       
 LEFT JOIN  CurrentStock2 X2(NOLOCK) ON(X1.tCode = X2.StockCode AND A.PARTNUMBER1 = X2.PARTNUMBER)       
 LEFT JOIN Part_Master F ON(A.BRANDID = F.BRANDID AND A.partnumber1 = F.partnumber1)
 LEFT JOIN StateMaster G(NOLOCK) on (D.StateCode = G.StateCode)
 LEFT JOIN CityMaster H(NOLOCK) on (D.CityCode = H.CityCode)
 Left JOIN AdminMaster_GEN J(NOLOCK) on (a.ADDEDBY = j.bintId_Pk)
 Left JOIN AdminMaster_GEN K(NOLOCK) on (a.updatedBy = k.bintId_Pk)
      
WHERE A.BRANDID=28 and D.Status=1 and D.SharingStatus=1      
and BB.PartNumber is NULL and a.addedtype ='B' and c.vcName not LIKE '%test%'`


const Honda4W_Brand_Pool_Query=`SELECT B.vcbrand BRAND,      
C.vcName DEALER,D.work_location LOCATION, d.EMO_Code DEALERCODE, h.CityName CITY, g.StateName STATE,       
''''+A.PARTNUMBER1 Partnumber,      
F.partdesc DESCRIPTION,      
F.Category PARTTYPE,      
ISNULL(F.MRP,0) MRP,      
ISNULL(F.landedcost,0) NDP,      
--F.MOQ,      
--F.MODEL 'Model',
isnull(A.DISCOUNT,0) 'Discount' ,      
(ISNULL(F.MRP,0)-ISNULL(F.MRP,0)*A.DISCOUNT*.01) as 'Discounted Unit Price',      
A.AUTOREMOVAL 'Removal Flag',
a.REASON 'Reason Of Removal',      
X2.qty 'Latest Stock Qty',      
CONVERT(VARCHAR(20), X1.stockdate,106) 'Latest Stock Date',      
CASE WHEN A.DISCOUNT>=0 AND  A.DISCOUNT<15 THEN '0-14%'  WHEN A.DISCOUNT>=15 AND  A.DISCOUNT<25 THEN '15-24%'  WHEN A.DISCOUNT>=25 AND  A.DISCOUNT<35 THEN '25-34%'  
WHEN A.DISCOUNT>=35 AND  A.DISCOUNT<=50 THEN '35-50%'  WHEN A.DISCOUNT>50  THEN '51% or higher%' END 'Discount Slab',      
ROUND(ISNULL(X2.QTY,0)*ISNULL(F.landedcost,0),2)'PARTVALUE(NDP)',
--A.SCSVERIFIED SCSVerified,      
--A.DEALERVERIFIED DealerVerified,    
---- added below 3 columns as per manish sir 10 dec 24  
coalesce(a.UpdatedDate,a.addeddate) as UpdatedDate

FROM SH_UPLOADNONMOVINGPART A       
 INNER JOIN Brand_Master B(NOLOCK) ON(A.BRANDID = B.bigid)       
 LEFT JOIN SH_BrandBlockListUpload BB (NOLOCK) ON (A.PARTNUMBER=BB.Partnumber)      
 INNER JOIN Dealer_Master C(NOLOCK) ON(A.DEALERID = C.bigid) 
 INNER JOIN Dealer_Workshop_Master D(NOLOCK) ON(A.LOCATIONID = D.bigid)       
 LEFT JOIN  CurrentStock1 X1(NOLOCK) ON(A.LOCATIONID = X1.LOCATIONID)       
 LEFT JOIN  CurrentStock2 X2(NOLOCK) ON(X1.tCode = X2.StockCode AND A.PARTNUMBER1 = X2.PARTNUMBER)       
 LEFT JOIN Part_Master F ON(A.BRANDID = F.BRANDID AND A.partnumber1 = F.partnumber1)
 LEFT JOIN StateMaster G(NOLOCK) on (D.StateCode = G.StateCode)
 LEFT JOIN CityMaster H(NOLOCK) on (D.CityCode = H.CityCode)
 Left JOIN AdminMaster_GEN J(NOLOCK) on (a.ADDEDBY = j.bintId_Pk)
 Left JOIN AdminMaster_GEN K(NOLOCK) on (a.updatedBy = k.bintId_Pk)
      
WHERE A.BRANDID=14 and D.Status=1 and D.SharingStatus=1      
and BB.PartNumber is NULL and a.addedtype ='B' and c.vcName not LIKE '%test%'`

export {PC_NM_Pool_Mailer,Honda4W_Brand_Pool_Query}