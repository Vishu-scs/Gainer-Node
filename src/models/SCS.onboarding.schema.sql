USE [z_scope]
GO
/****** Object:  Table [dbo].[SCS_ONB_BankDetails]    Script Date: 13-05-2025 15:33:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_BankDetails](
	[LocationID] [int] NOT NULL,
	[AccountHolderName] [varchar](50) NULL,
	[AccountNumber] [varchar](30) NOT NULL,
	[BankName] [varchar](50) NOT NULL,
	[BranchName] [varchar](50) NOT NULL,
	[IFSCCode] [varchar](20) NOT NULL,
	[CheckImg] [nvarchar](max) NOT NULL,
	[Addedby] [int] NULL,
	[Addedon] [datetime] NULL,
	[Status] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCS_ONB_ContactDetails]    Script Date: 13-05-2025 15:33:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_ContactDetails](
	[LocationID] [int] NOT NULL,
	[DesignationID] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[MobileNo] [varchar](10) NOT NULL,
	[Email] [nvarchar](100) NULL,
	[Addedby] [int] NULL,
	[Addedon] [datetime] NULL,
	[Status] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCS_ONB_Dealer]    Script Date: 13-05-2025 15:33:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_Dealer](
	[Brandid] [int] NOT NULL,
	[Dealer] [varchar](50) NOT NULL,
	[Dealerid] [int] IDENTITY(1,1) NOT NULL,
	[OEMCode] [varchar](50) NOT NULL,
	[Addedby] [int] NULL,
	[Addedon] [datetime] NULL,
	[Status] [bit] NULL,
	[UserID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Dealerid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCS_ONB_DesignationMaster]    Script Date: 13-05-2025 15:33:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_DesignationMaster](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Designation] [varchar](50) NOT NULL,
	[Addedby] [int] NULL,
	[Addedon] [datetime] NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCS_ONB_LocationDetails]    Script Date: 13-05-2025 15:33:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_LocationDetails](
	[Dealerid] [int] NULL,
	[LocationID] [int] IDENTITY(1,1) NOT NULL,
	[Location] [varchar](50) NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
	[PincodeID] [int] NOT NULL,
	[CityID] [int] NOT NULL,
	[StateID] [int] NOT NULL,
	[Latitude] [decimal](15, 13) NOT NULL,
	[Longitude] [decimal](15, 13) NOT NULL,
	[SIMS] [bit] NULL,
	[Gainer] [bit] NULL,
	[Audit] [bit] NULL,
	[Addedby] [int] NULL,
	[Addedon] [datetime] NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[LocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCS_ONB_TaxDetails]    Script Date: 13-05-2025 15:33:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_TaxDetails](
	[LocationID] [int] NOT NULL,
	[TAN] [varchar](50) NOT NULL,
	[PAN] [varchar](50) NOT NULL,
	[GST] [varchar](50) NOT NULL,
	[GSTCertificate] [nvarchar](max) NOT NULL,
	[Addedby] [int] NULL,
	[Addedon] [datetime] NULL,
	[Status] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCS_ONB_User]    Script Date: 13-05-2025 15:33:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCS_ONB_User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [nvarchar](max) NULL,
	[Addedon] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[SCS_ONB_DesignationMaster] ON 

INSERT [dbo].[SCS_ONB_DesignationMaster] ([ID], [Designation], [Addedby], [Addedon], [Status]) VALUES (1, N'Owner', 146297, CAST(N'2025-05-11T12:07:04.357' AS DateTime), 1)
INSERT [dbo].[SCS_ONB_DesignationMaster] ([ID], [Designation], [Addedby], [Addedon], [Status]) VALUES (2, N'GM Workshop', 146297, CAST(N'2025-05-11T12:07:04.357' AS DateTime), 1)
INSERT [dbo].[SCS_ONB_DesignationMaster] ([ID], [Designation], [Addedby], [Addedon], [Status]) VALUES (3, N'GM Parts', 146297, CAST(N'2025-05-11T12:07:04.357' AS DateTime), 1)
INSERT [dbo].[SCS_ONB_DesignationMaster] ([ID], [Designation], [Addedby], [Addedon], [Status]) VALUES (4, N'Spare Parts Manager', 146297, CAST(N'2025-05-11T12:07:04.357' AS DateTime), 1)
INSERT [dbo].[SCS_ONB_DesignationMaster] ([ID], [Designation], [Addedby], [Addedon], [Status]) VALUES (5, N'Spare Parts Executive', 146297, CAST(N'2025-05-11T12:07:04.357' AS DateTime), 1)
INSERT [dbo].[SCS_ONB_DesignationMaster] ([ID], [Designation], [Addedby], [Addedon], [Status]) VALUES (6, N'Accounts Manager', 146297, CAST(N'2025-05-11T12:07:04.357' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[SCS_ONB_DesignationMaster] OFF
GO
/****** Object:  Index [UQ_Location_Designation]    Script Date: 13-05-2025 15:33:39 ******/
ALTER TABLE [dbo].[SCS_ONB_ContactDetails] ADD  CONSTRAINT [UQ_Location_Designation] UNIQUE NONCLUSTERED 
(
	[LocationID] ASC,
	[DesignationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SCS_ONB_BankDetails] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_BankDetails] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[SCS_ONB_ContactDetails] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_ContactDetails] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[SCS_ONB_Dealer] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_Dealer] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[SCS_ONB_DesignationMaster] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_DesignationMaster] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails] ADD  DEFAULT ((0)) FOR [SIMS]
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails] ADD  DEFAULT ((0)) FOR [Gainer]
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails] ADD  DEFAULT ((0)) FOR [Audit]
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[SCS_ONB_TaxDetails] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_TaxDetails] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[SCS_ONB_User] ADD  DEFAULT (getdate()) FOR [Addedon]
GO
ALTER TABLE [dbo].[SCS_ONB_ContactDetails]  WITH CHECK ADD  CONSTRAINT [FK_Contact_Designation] FOREIGN KEY([DesignationID])
REFERENCES [dbo].[SCS_ONB_DesignationMaster] ([ID])
GO
ALTER TABLE [dbo].[SCS_ONB_ContactDetails] CHECK CONSTRAINT [FK_Contact_Designation]
GO
ALTER TABLE [dbo].[SCS_ONB_ContactDetails]  WITH CHECK ADD  CONSTRAINT [FK_Contact_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[SCS_ONB_LocationDetails] ([LocationID])
GO
ALTER TABLE [dbo].[SCS_ONB_ContactDetails] CHECK CONSTRAINT [FK_Contact_Location]
GO
ALTER TABLE [dbo].[SCS_ONB_Dealer]  WITH CHECK ADD  CONSTRAINT [FK_User_Dealer] FOREIGN KEY([UserID])
REFERENCES [dbo].[SCS_ONB_User] ([UserId])
GO
ALTER TABLE [dbo].[SCS_ONB_Dealer] CHECK CONSTRAINT [FK_User_Dealer]
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails]  WITH CHECK ADD  CONSTRAINT [FK_Location_Dealer] FOREIGN KEY([Dealerid])
REFERENCES [dbo].[SCS_ONB_Dealer] ([Dealerid])
GO
ALTER TABLE [dbo].[SCS_ONB_LocationDetails] CHECK CONSTRAINT [FK_Location_Dealer]
GO
