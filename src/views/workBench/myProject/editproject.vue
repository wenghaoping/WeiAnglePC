<template>
  <div id="editproject" class="clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div id="wid" class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box" ref="left" >
        <div class="left-wrap" style="margin-top:24px;">
          <!--=================================项目文件=================================-->
          <div class="d_jump"></div>
          <div class="item-block" style="margin-top:0;">
            <div class="block-tt-line">
              <span class="b-title">项目文件</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('fileShow')" v-show="fileShow">收起</span>
              <span class="b-hander" @click="openDiv('fileShow')" v-show="!fileShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="fileShow">
                <div class="block-info block-cc-file block-cc-pro">
                  <span class="f-title fl">商业计划书</span>
                  <span class="uploadImg fl" style="margin: 15px 0px 0px 20px;" v-if="uploadLoading"><img src="../../../assets/images/loading.gif"></span>
                  <span class="uploadImg fl" style="margin: 15px 0px 0px 20px;" v-else></span>
                  <span class="fl">
                    <el-upload class="planUpload"
                               :action="uploadAddress"
                               :on-preview="planPreview"
                               :on-change="planChange"
                               :on-success="planuploadsuccess"
                               :on-error="planuploaderror"
                               :on-remove="planRemove"
                               :before-upload="beforeUpload"
                               :file-list="planList"
                               accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
                               :data="uploadDate">
                      <el-button slot="trigger" type="primary" v-show="planButton" @click="zgClick('上传BP')">计划书上传</el-button>
                    </el-upload>
                  </span>
                  <span class="f-tips fl" style="margin-left: 8px;" v-show="planButton"><i>BP私密保护，投资人可通过申请查看来了解项目价值</i><i>支持pdf、ppt、pptx、doc、docx、zip、rar文件格式，单个文件最大50M</i></span>
                </div>
                <div class="block-info block-cc-pro" style="margin-top:15px;">
                  <span class="f-title fl">项目文件</span>
                  <span style="margin-left: 34px;" class="fl">
                      <el-upload
                        class="upload"
                        ref="upload"
                        :action="uploadAddressFile"
                        :on-change="handleChange"
                        :on-success="uploadsuccess"
                        :on-error="uploaderror"
                        :before-upload="beforeUpload1"
                        :file-list="fileList"
                        :data="fileuploadDate"
                        :show-file-list="showList"
                        accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                        multiple>
                        <el-button slot="trigger" type="primary" @click="zgClick('上传文件')">批量上传</el-button>
                      </el-upload>
                  </span>
                  <span class="f-tips fl" style="margin-left: 8px;"><i>项目文件仅自己可见</i><i>支持pdf、ppt、pptx、doc、docx、rar、zip、png、jpg、jpeg文件格式，单个文件最大50M</i></span>
                </div>
                <div class="block-info block-cc-other" style="margin-bottom: 15px;"
                     v-for="(list, index) in uploadShow2.lists"
                     :key="list.index">
                  <span class="f-title">{{list.bp_type}} : </span>
                  <span class="f-name" @click.prevent="download(list)"
                        style="cursor: pointer">{{list.file_title}}</span>
                  <span v-if="!list.load"  class="del-btn" @click.prevent="removeList(list)"><img src="../../../assets/images/delete.png"></span>
                  <span v-if="!list.load"  class="solt-btn" @click.prevent="toGroup(list)">分组设置</span>
                  <span v-if="list.load" class="uploadImg"><img src="../../../assets/images/loading.gif"></span>
                  <span v-if="list.load"  class="del-btn" @click.prevent="cancelUpload(list)">取消</span>
                </div>
              </div>
            </el-collapse-transition>
          </div>
          <!--=================================项目介绍=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">项目介绍</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('ProjectShow')" v-show="ProjectShow">收起</span>
              <span class="b-hander" @click="openDiv('ProjectShow')" v-show="!ProjectShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="ProjectShow">
                <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <span class="justIlook">(仅自己可见)</span>
                      <el-form-item
                        label="项目名称"
                        prop="pro_name"
                        :rules="[{min: 1, max:40,message: '最大40个字符',trigger: 'blur'}]">
                        <el-input v-model="project.pro_name" placeholder="项目代号，快速识别"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <span class="justIlook2">(仅自己可见,IE浏览器暂不支持输入)</span>
                      <el-form-item
                        label="公司名称"
                        :rules="[{min: 1, max:40,message: '最大40个字符',trigger: 'blur'}]"
                        prop="pro_company_name">
                        <el-autocomplete v-model="project.pro_company_name"
                                         :fetch-suggestions="querySearchAsync"
                                         placeholder="公司全网检索，一键同步公司信息"
                                         @select="handleSelect" style="width:260px;">
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>

                    <el-tooltip class="item" effect="dark" placement="top-end">
                      <div slot="content">从微天使创投数据库自动获取公司行业，融资轮次<br/>历史融资，核心团队及里程碑等项目信息</div>
                      <el-button class="tong" @click="syncOne" type="text">一键同步</el-button>
                    </el-tooltip>
                    <span class="ques">
                        <el-tooltip placement="bottom-end">
                            <div slot="content">
                              <div class="tips-txt">1、一键同步公司信息，快速创建项目</div>
                              <div class="tips-txt" style="margin-top:5px;">2、可在项目详情查看尽调报告</div>
                            </div>
                            <img src="../../../assets/images/why.png" alt=""/>
                        </el-tooltip>
                      </span>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目介绍"
                        prop="pro_intro"
                        :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'},{min: 1, max:40,message: '最大40个字符'}]">
                        <el-input v-model="project.pro_intro" placeholder="一句话吸引投资人，是决定投资人查看项目的重要因素"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                      <el-form-item
                        label="所属省级"
                        prop="pro_area.pid"
                        :rules="[{required: true, message: '所属省级不能为空', trigger: 'change',type: 'number'}]" style="width: 170px;">
                        <el-select v-model="project.pro_area.pid" placeholder="请选择" @change="area1Change2">
                          <el-option
                            v-for="item in area"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                      <el-form-item label="所属市级"
                                    prop="pro_area.area_id"
                                    :rules="[{required: true, message: '所属市级不能为空', trigger: 'change',type: 'number'}]" style="width: 160px;">
                        <el-select v-model="project.pro_area.area_id" placeholder="请选择">
                          <el-option
                            v-for="item in area2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目轮次"
                        prop="pro_stage.stage_id"
                        :rules="[{type:'number',required: true, message: '项目轮次不能为空', trigger: 'change'}]">
                        <el-select v-model="project.pro_stage.stage_id" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in stage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目领域"
                        prop="pro_industry"
                        :rules="[{type: 'array',required: true, message: '项目领域不能为空', trigger: 'change'}]">
                        <el-select
                          v-model="project.pro_industry"
                          multiple filterable
                          :multiple-limit="multiplelimit"
                          placeholder="请添加领域（最多5个），支持检索" class="width360">
                          <el-option
                            v-for="item in industry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="期望融资"
                        prop="pro_scale.scale_id"
                        :rules="[{type: 'number',required: true, message: '期望融资不能为空', trigger: 'change'}]">
                        <el-select v-model="project.pro_scale.scale_id" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in scale"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="投后股份"
                        prop="pro_finance_stock_after"
                        :rules="ScaleRule">
                        <el-input v-model="project.pro_finance_stock_after" placeholder="请输入具体数值，如：10" >
                          <el-button slot="append" >%</el-button>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目估值( 万 )"
                        :rules="BigNumberRule"
                        prop="pro_finance_value">
                        <el-input v-model="project.pro_finance_value" placeholder="请输入具体数值，如：1000"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="私密设置"
                        prop="open_status">
                        <el-select v-model="project.open_status" placeholder="请选择" class="width360">
                          <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="0"></el-option>
                          <el-option label="公开项目（投放到交易易市场参与融资匹配，投资人可以申请查看bp，每日限公开一次)" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="项目标签"
                        prop="tag">
                        <el-select v-model="project.tag" multiple filterable
                                   placeholder="请输入项目的亮点标签，投资人可通过标签检索，如优秀团队，技术壁垒"
                                   allow-create default-first-option
                                   @change="addChangepro"
                        style="width: 100%">
                          <el-option
                            v-for="item in tags_pro"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div class="goodness">
                    <!--投资亮点-->
                    <div style="margin-bottom: 15px">
                           <span style="font-size:16px;color:#5e6d82;">投资亮点</span>
                           <span style="font-size:14px;color:#99a9bf;">（是决定投资人是否查看项目详情的重要因素，以不超过3点为宜）</span></div>
                    <el-row :span="24" :gutter="25">
                      <el-col :span="5">
                        <el-form-item
                                      v-for="(domain, index) in project.goodness.pro_goodness"
                                      :key="index.key"
                                      :prop="'goodness.pro_goodness.' + index + '.goodness_title'"
                                      :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                          <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(1)" @blur="blur(1)" ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <div class="goodnessTag" :class="{goodnessTagBl:tagShow==1}" style="top: -100px;right:10px;" >
                          <!--:style="{top:-86* + 'px' }"-->
                          <img src="../../../assets/images/xiangmuliangdian.png">
                        </div>
                        <el-form-item
                                      v-for="(domain, index) in project.goodness.pro_goodness"
                                      :key="index.key"
                                      :prop="'goodness.pro_goodness.' + index + '.goodness_desc'"
                                      :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                          <el-input  v-model="domain.goodness_desc"
                                     placeholder="" @focus="focus(1)" @blur="blur(1)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1" >
                        <el-form-item label="　　"
                                      v-for="(domain, index) in project.goodness.pro_goodness"
                                      :key="index.key"
                                      style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                          <span class="imgdele fr lin" @click.prevent="removegoodNess(domain)" >删除</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="marginAuto" style="width:156px;">
                      <div class="addhover">
                        <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                        <el-button type="text" @click="addgoodNess" class="addMember fl"> 添加条目</el-button>
                      </div>
                    </div>

                    <!--市场概况-->
                    <div style="margin-bottom: 15px">
                      <span style="font-size:16px;color:#5e6d82;">市场概况</span>
                      <span style="font-size:14px;color:#99a9bf;">（市场规模和增速、竞争格局、政策等，以不超过3点为宜）</span></div>
                    <el-row :span="24" :gutter="25">
                      <el-col :span="5">
                        <el-form-item
                          v-for="(domain, index) in project.goodness.pro_market_genera"
                          :key="index.key"
                          :prop="'goodness.pro_market_genera.' + index + '.goodness_title'"
                          :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                          <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(2)" @blur="blur(2)" ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <div class="goodnessTag" :class="{goodnessTagBl:tagShow==2}"  style="top: -100px;">
                          <img src="../../../assets/images/shichanggaikuang.png">
                        </div>
                        <el-form-item
                          v-for="(domain, index) in project.goodness.pro_market_genera"
                          :key="index.key"
                          :prop="'goodness.pro_market_genera.' + index + '.goodness_desc'"
                          :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                          <el-input  v-model="domain.goodness_desc"
                                     placeholder="" @focus="focus(2)" @blur="blur(2)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1" >
                        <el-form-item label="　　"
                                      v-for="(domain, index) in project.goodness.pro_market_genera"
                                      :key="index.key"
                                      style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                          <span class="imgdele fr lin" @click.prevent="removegoodNess1(domain)" >删除</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="marginAuto" style="width:156px;">
                      <div class="addhover">
                        <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                        <el-button type="text" @click="addgoodNess1" class="addMember fl"> 添加条目</el-button></div>
                    </div>
                    <!--产品概况-->
                    <div style="margin-bottom: 15px">
                      <span style="font-size:16px;color:#5e6d82;">产品概况</span>
                      <span style="font-size:14px;color:#99a9bf;">（选择项目产品或模式一种重点介绍即可，以不超过3点为宜）</span></div>
                    <el-row :span="24" :gutter="25">
                      <el-col :span="5">
                        <el-form-item
                          v-for="(domain, index) in project.goodness.pro_service"
                          :key="index.key"
                          :prop="'goodness.pro_service.' + index + '.goodness_title'"
                          :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                          <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(3)" @blur="blur(3)" ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <div class="goodnessTag" :class="{goodnessTagBl:tagShow==3}"  style="top: -65px;">
                          <img src="../../../assets/images/chanpiongaikuang.png">
                        </div>
                        <el-form-item
                          v-for="(domain, index) in project.goodness.pro_service"
                          :key="index.key"
                          :prop="'goodness.pro_service.' + index + '.goodness_desc'"
                          :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                          <el-input  v-model="domain.goodness_desc"
                                     placeholder="" @focus="focus(3)" @blur="blur(3)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1" >
                        <el-form-item label="　　"
                                      v-for="(domain, index) in project.goodness.pro_service"
                                      :key="index.key"
                                      style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                          <span class="imgdele fr lin" @click.prevent="removegoodNess2(domain)" >删除</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="marginAuto" style="width:156px;">
                      <div class="addhover">
                        <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                        <el-button type="text" @click="addgoodNess2" class="addMember fl"> 添加条目</el-button></div>
                    </div>
                    <!--商业模式-->
                    <div style="margin-bottom: 15px">
                      <span style="font-size:16px;color:#5e6d82;">商业模式</span>
                      <span style="font-size:14px;color:#99a9bf;">（用来说明通过什么方式盈利）</span></div>
                    <el-row :span="24" :gutter="25">
                      <el-col :span="5">
                        <el-form-item
                          v-for="(domain, index) in project.goodness.pro_business_model"
                          :key="index.key"
                          :prop="'goodness.pro_business_model.' + index + '.goodness_title'"
                          :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                          <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(4)" @blur="blur(4)" ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <div class="goodnessTag" :class="{goodnessTagBl:tagShow==4}"  style="top: -65px;">
                          <img src="../../../assets/images/shangyemoshi.png">
                        </div>
                        <el-form-item
                          v-for="(domain, index) in project.goodness.pro_business_model"
                          :key="index.key"
                          :prop="'goodness.pro_business_model.' + index + '.goodness_desc'"
                          :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                          <el-input  v-model="domain.goodness_desc"
                                     placeholder="" @focus="focus(4)" @blur="blur(4)"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1" >
                        <el-form-item label="　　"
                                      v-for="(domain, index) in project.goodness.pro_business_model"
                                      :key="index.key"
                                      style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                          <span class="imgdele fr lin" @click.prevent="removegoodNess3(domain)" >删除</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="marginAuto" style="width:156px;">
                      <div class="addhover">
                        <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                        <el-button type="text" @click="addgoodNess3" class="addMember fl"> 添加条目</el-button></div>
                    </div>

                  </div>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================公司运营=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">公司运营</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('operateShow')" v-show="operateShow">收起</span>
              <span class="b-hander" @click="openDiv('operateShow')" v-show="!operateShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="operateShow">
                <el-form :model="company" ref="company" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="运营状态"
                        prop="pro_status.status_id">
                        <el-radio-group v-model="company.pro_status.status_id" @change="radiochange">
                          <el-radio v-for="companystate in company_status" class="radio"
                                    :label="companystate.label"
                                    :key="companystate.value"
                          >{{companystate.value}}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="公司规模"
                        prop="pro_company_scale.comp_scale_id">
                        <el-select v-model="company.pro_company_scale.comp_scale_id" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in company_scale"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="公司官网"
                        :rules="[{ type: '', message: '请输入正确的链接', trigger: 'blur' }]"
                        prop="pro_website">
                        <el-input v-model="company.pro_website" placeholder="请输入网址">
                          <template slot="prepend">Http://</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================产品=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">产品</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('brandShow')" v-show="brandShow">收起</span>
              <span class="b-hander" @click="openDiv('brandShow')" v-show="!brandShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="brandShow">
                <el-form :model="brands" ref="brands" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="6">
                      <el-form-item
                        label="名称"
                        :prop="'brand.' + index + '.brand_name'"
                        v-for="(brand, index) in brands.brand"
                        :key="brand.key"
                        :rules="[{required: true, message: '名称不能为空', trigger: 'blur'},{max:40,message: '最大40个字符'}]">
                        <el-input v-model="brand.brand_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="类型"
                        :prop="'brand.' + index + '.type_id'"
                        v-for="(brand, index) in brands.brand"
                        :key="brand.key">
                        <el-select v-model="brand.type_id" placeholder="请选择">
                          <el-option
                            v-for="item in brand_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="项目亮点"
                        :rules="{max:500,message: '最大500个字符',trigger: 'blur'}"
                        :prop="'brand.' + index + '.brand_desc'"
                        v-for="(brand, index) in brands.brand"
                        :key="brand.key">
                        <el-input v-model="brand.brand_desc" placeholder="一句话描述产品亮点" class="width360"> </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　"
                                    v-for="(brand, index) in brands.brand"
                                    :key="brand.key"
                                    style="margin-left: 50px;" class="clearfix">
                        <span class="imgdele fr" @click.prevent="removeBrand(brand)">删除</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="marginAuto">
                  <div class="addhover">
                  <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                  <el-button type="text" @click="addBrand" class="addMember fl"> 添加产品</el-button></div>
                  <div class="addhover addMember2">
                    <i  class="addmemberimg"><img src="../../../assets/images/reload.png"></i>
                    <el-button type="text" @click="syncOne" class="addMember fl ">自动获取</el-button>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================核心团队=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">核心团队</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('teamShow')" v-show="teamShow">收起</span>
              <span class="b-hander" @click="openDiv('teamShow')" v-show="!teamShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="teamShow">
                <el-form :model="team" ref="team" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="团队标签"
                        prop="tags_team">
                        <el-select
                          style="width: 100%"
                          v-model="team.tag"
                          multiple
                          filterable
                          allow-create
                          placeholder="团队的亮点标签，投资人可通过标签检索，如阿里系，海龟系（最多5个)"
                          default-first-option
                          :multiple-limit="multiplelimit"
                          @change="addChangeTeam">
                          <el-option
                            v-for="item in tags_team"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="4">
                      <el-form-item
                        label="成员姓名"
                        :prop="'core_users.' + index + '.ct_member_name'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index"
                        :rules="[{required: true, message: '成员姓名不能为空', trigger: 'blur'},{min: 1, max:20,message: '最大20个字符'}]">
                        <el-input v-model="member.ct_member_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="成员职位"
                        :rules="{max:40,message: '最大40个字符',trigger: 'blur'}"
                        :prop="'core_users.' + index + '.ct_member_career'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index">
                        <el-input v-model="member.ct_member_career" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="股权比例"
                        :prop="'core_users.' + index + '.stock_scale'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index"
                        :rules="ScaleRule">
                        <el-input v-model="member.stock_scale" placeholder="请输入数值">
                          <template slot="append">%</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="成员介绍"
                        :rules="{max:500,message: '最大500个字符',trigger: 'blur'}"
                        :prop="'core_users.' + index + '.ct_member_intro'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index">
                        <el-input v-model="member.ct_member_intro" placeholder="请输入" class="width360"> </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　" v-for="(member, index) in team.core_users" :key="member.index" style="margin-left: 50px;" class="clearfix">
                        <span class="imgdele fr" @click.prevent="removeMember(member)">删除</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="marginAuto">
                    <div class="addhover">
                      <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                      <el-button type="text" @click="addMember" class="addMember fl">添加成员</el-button>
                    </div>
                    <div class="addhover addMember2">
                      <i  class="addmemberimg"><img src="../../../assets/images/reload.png"></i>
                      <el-button type="text" @click="syncOne" class="addMember fl ">自动获取</el-button>
                    </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>


          <!--=================================融资信息=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">融资信息</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('financingShow')" v-show="financingShow">收起</span>
              <span class="b-hander" @click="openDiv('financingShow')" v-show="!financingShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="financingShow">
                <el-form :model="financing" ref="financing" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="资金用途"
                        :rules="{max:500,message: '最大500个字符',trigger: 'blur'}"
                        prop="pro_finance_use">
                        <el-input v-model="financing.pro_finance_use"
                                  placeholder="请输入投资后的资金用途，如：团队搭建、运营推广······"
                                  type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 12}"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :span="24" :gutter="32">
                    <el-col :span="4">
                      <el-form-item
                        label="历史融资时间"
                        :prop="'pro_history_finance.' + index + '.finance_time'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                        <el-date-picker
                          v-model="history.finance_time"
                          type="date"
                          placeholder="选择日期" style="width: 125px;">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="历史融资轮次"
                        :prop="'pro_history_finance.' + index + '.pro_finance_stage'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{type:'number',required: true, message: '融资轮次不能为空', trigger: 'change'}]">
                        <el-select v-model="history.pro_finance_stage" placeholder="请选择">
                          <el-option
                            v-for="item in stage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="融资金额"
                        :prop="'pro_history_finance.' + index + '.pro_finance_scale'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{required: true, message: '融资金额不能为空', trigger: 'change'},{max:20,message: '最大20个字符'}]">
                        <el-input v-model="history.pro_finance_scale" placeholder="请输入数值"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="历史投资方"
                        :prop="'pro_history_finance.' + index + '.pro_finance_investor'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{required: true, message: '历史投资方不能为空', trigger: 'blur'},{max:40,message: '最大40个字符'}]" class="width360">
                        <el-input v-model="history.pro_finance_investor" placeholder="请输入历史投资方"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　" v-for="(history, index) in financing.pro_history_finance"
                                    :key="history.index" style="margin-left: 50px;" class="clearfix">
                        <span class="imgdele fr" @click.prevent="removeHistory(history)">删除</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="marginAuto">
                  <div class="addhover">
                    <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                    <el-button type="text" @click="addHistory" class="addMember fl">添加历史融资</el-button>
                  </div>
                  <div class="addhover addMember2">
                    <i  class="addmemberimg"><img src="../../../assets/images/reload.png"></i>
                    <el-button type="text" @click="syncOne" class="addMember fl ">自动获取</el-button>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>


          <!--=================================里程碑=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">里程碑</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('milepostShow')" v-show="milepostShow">收起</span>
              <span class="b-hander" @click="openDiv('milepostShow')" v-show="!milepostShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="milepostShow">
                <el-form :model="milepost" ref="milepost" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="时间"
                        :prop="'pro_develop.' + index + '.dh_start_time'"
                        v-for="(milePostSomeThing, index) in milepost.pro_develop"
                        :key="milePostSomeThing.index"
                        :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                        <el-date-picker
                          v-model="milePostSomeThing.dh_start_time"
                          type="date"

                          style="width: 360px;"
                          placeholder="选择日期" class="width360">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="事件"
                        :prop="'pro_develop.' + index + '.dh_event'"
                        v-for="(milePostSomeThing, index) in milepost.pro_develop"
                        :key="milePostSomeThing.index"
                        :rules="[{required: true, message: '事件不能为空', trigger: 'blur'},{min: 1, max:40,message: '最大40个字符'}]" class="width360">
                        <el-input v-model="milePostSomeThing.dh_event" placeholder="请描述事件内容"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　" v-for="(milePostSomeThing, index) in milepost.pro_develop"
                                    :key="milePostSomeThing.index" style="margin-left: 50px;" class="clearfix">
                        <span class="imgdele fr" @click.prevent="removemilePost(milePostSomeThing)">删除</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="marginAuto">
                  <div class="addhover">
                    <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                    <el-button type="text" @click="addmilePost" class="addMember fl">添加里程碑</el-button>
                  </div>
                  <div class="addhover addMember2">
                    <i  class="addmemberimg"><img src="../../../assets/images/reload.png"></i>
                    <el-button type="text" @click="syncOne" class="addMember fl ">自动获取</el-button>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================FA业务===============================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">FA业务</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('SignShow')" v-show="SignShow">收起</span>
              <span class="b-hander" @click="openDiv('SignShow')" v-show="!SignShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="SignShow">
                <el-form :model="pro_FA" ref="pro_FA" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="是否独家"
                        prop="is_exclusive"
                        :rules="[{ required: true, message: '请选择源', trigger: 'change' }]">
                        <el-radio v-model="pro_FA.is_exclusive" :label=2 style="margin-right: 12px;">非独家FA签约</el-radio>
                        <el-radio v-model="pro_FA.is_exclusive" :label=1>独家FA签约</el-radio>
                        <el-radio v-model="pro_FA.is_exclusive" :label=0>其他</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <div class="zijikejian">
                        <img src="../../../assets/images/zijikejian.png">
                      </div>
                    </el-col>
                  </el-row>
                </el-form>

                <el-form :model="private" ref="private" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="6">
                      <el-form-item
                        label="项目联系人"
                        :rules="{max:20,message: '最大20个字符',trigger: 'blur'}"
                        prop="contact_user_name">
                        <el-input v-model="private.contact_user_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="联系人手机号" prop="contact_user_mobile" :rules="PhoneRule">
                        <el-input v-model="private.contact_user_mobile" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="职位"
                        :rules="{max:40,message: '最大40个字符',trigger: 'blur'}"
                        prop="contact_user_career">
                        <el-input v-model="private.contact_user_career" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目来源"
                        prop="pro_source">
                        <el-select v-model="private.pro_source"
                                   multiple
                                   placeholder="请输入项目来源，如：来源机构、来源人"
                                   class="width360"
                                   filterable
                                   allow-create
                                   default-first-option
                                   @change="addChangesource"
                                   :multiple-limit="multiplelimit">
                          <el-option
                            v-for="item in tags_source"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目备注"
                        :rules="{max:40,message: '最大40个字符',trigger: 'blur'}"
                        prop="pro_remark">
                        <el-input v-model="private.pro_remark" placeholder="项目执行上的备注信息"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="签约佣金"
                        prop="commission"
                        :rules="ScaleRule">
                        <el-input v-model="private.commission" placeholder="请输入具体数值，如：10">
                          <el-button slot="append">%</el-button>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="股权赠与"
                        prop="stock_right"
                        :rules="ScaleRule">
                        <el-input v-model="private.stock_right" placeholder="请输入具体数值，如：10">
                          <el-button slot="append">%</el-button>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="跟投权"
                        prop="stock_follow"
                        :rules="{max:40,message: '最大40个字符',trigger: 'blur'}">
                        <el-input v-model="private.stock_follow" placeholder="请输入跟投权"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="其他权益"
                        prop="stock_other"
                        :rules="{max:40,message: '最大40个字符',trigger: 'blur'}">
                        <el-input v-model="private.stock_other" placeholder="请输入其他权益"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>
          <div class="ul-lists list tc"  style="padding:0">
            <div class="toButton" style="padding-left: 0;z-index: 111">
              <el-button type="primary" size="large" @click="allSave" :disabled="submitButton" style="margin: 0 auto">
                保存
              </el-button>
            </div>
          </div>
          <div style="height: 50px;"></div>
        </div>
        <div class="right-wrap" ref="right">
          <div class="command-box">
            <div class="command-title">
              项目完整度：<span class="command-val">{{proportion}}%</span>
            </div>
            <div class="command-title-sec">
              完整度超过60%的项目更容易被投资人关注
            </div>
            <div class="command-progress">
              <div class="progress-bg"></div>
              <div class="progress-fg" :style="{ width: proportion+'%'}"></div>
            </div>
          </div>
          <div style="margin-top:15px;background: #F9FAFC;border-radius: 2px;">
            <div class="check-block" :class="{'checked':node0}" @click="setNode('0')" >
              <span class="block-icon">
                <img src="../../../assets/images/arts.png" alt="">
              </span>
              <span class="block-tlt">项目文件
                <span class="tlt-tips" v-show="fileMust">请添加商业计划书</span>
              </span>
              <span class="check-flag">
                <img v-if="filePerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node1}" @click="setNode('1')">
              <span class="block-icon">
                <img src="../../../assets/images/arts.png" alt="">
              </span>
              <span class="block-tlt">项目介绍
                <span class="tlt-tips" v-show="projectMust">项目介绍填写有误</span>
              </span>
              <span class="check-flag">
                <img v-if="projectPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node2}" @click="setNode('2')">
              <span class="block-icon">
                <img src="../../../assets/images/yunying.png" alt="">
              </span>
              <span class="block-tlt">公司运营
                <span class="tlt-tips" v-show="companyMust">公司运营填写有误</span>
              </span>
              <span class="check-flag">
                <img v-if="companyPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node3}" @click="setNode('3')">
              <span class="block-icon">
                <img src="../../../assets/images/pinpai.png" alt="">
              </span>
              <span class="block-tlt">产品
              <span class="tlt-tips" v-show="brandtMust">产品填写有误</span>
            </span>
              <span class="check-flag">
                <img v-if="brandsPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node4}" @click="setNode('4')">
              <span class="block-icon">
                <img src="../../../assets/images/group.png" alt="">
              </span>
              <span class="block-tlt">核心团队
                <span class="tlt-tips" v-show="teamMust">核心团队填写有误</span>
              </span>
              <span class="check-flag">
                <img v-if="teamPerfect" src="../../../assets/images/gou.png" alt="">
              <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node5}" @click="setNode('5')">
              <span class="block-icon">
                <img src="../../../assets/images/money.png" alt="">
              </span>
              <span class="block-tlt">融资信息
                <span class="tlt-tips" v-show="financingMust">融资信息填写有误</span>
              </span>
              <span class="check-flag">
                 <img v-if="financingPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node6}" @click="setNode('6')">
              <span class="block-icon">
                <img src="../../../assets/images/time.png" alt="">
              </span>
              <span class="block-tlt">里程碑
                <span class="tlt-tips" v-show="milepostMust">里程碑填写有误</span>
              </span>
              <span class="check-flag">
                 <img v-if="milepostPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>

            <div class="check-block" :class="{'checked':node7}" @click="setNode('7')">
              <span class="block-icon">
                <img src="../../../assets/images/doc.png" alt="">
              </span>
              <span class="block-tlt">FA业务
                <span class="tlt-tips" v-show="privateMust">FA业务填写有误</span>
              </span>
              <span class="check-flag">
                 <img v-if="privatePerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--添加运营状态的弹窗-->
    <el-dialog title="添加运营状态" :visible="addStateDisplay" :show-close="showList"
               close-on-press-escape close-on-click-modal lock-scroll>
      <el-form :model="form">
        <el-form-item label="运营状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelGroupChange">取 消</el-button>
        <el-button type="primary" @click="addState">确 定</el-button>
      </div>
    </el-dialog>
    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible="setFileDisplay" :show-close="showList"
               close-on-press-escape close-on-click-modal lock-scroll>
      <el-form :model="groups" ref="groups">
        <el-form-item label="分组名称" label-width="80px" prop="input"
                      :rules="[{required: true, message: '分组不能为空', trigger: 'blur',max: 40, message: '最多40个字符'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="groups.input" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('groups')">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="radios">
        <el-radio-group v-model="groups.type" @change="groupchange">
          <el-radio v-for="group in groups.group" class="radio"
                    :label="group.value"
                    :key="group.value"
          >{{group.label}}
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setFileDisplay = false">取 消</el-button>
        <el-button type="primary" @click="saveGroupChange">保　存</el-button>
      </div>
    </el-dialog>
    <!--一键同步选择框-->
    <syncprojectdetail :sync-project-detail-display="syncProjectDetailDisplay" :companyid="this.companyid"
                         @changeSyncProjectDetail="changeSyncProjectDetail"
                          @syncCompanyData="syncCompanyData">

    </syncprojectdetail>

<!--一键同步提示框-->
    <el-dialog
      title="一键同步"

      :visible="syncDialogDisplay"
      size="tiny" :show-close="showList"
    close-on-press-escape close-on-click-modal lock-scroll>
      <div style="color:#475669">
        微天使将为您同步 <i style="color:#8492A6">{{companyTitle}}</i>的相关信息，请先核实
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="syncDialogDisplay = false">取 消</el-button>
        <el-button type="primary" @click="syncProjectDetailDisplay = true">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import syncprojectdetail from '@/views/components/syncProjectDetail.vue';
  // import { mapState } from 'vuex';
  import * as validata from '@/utils/validata';
  import { getCity } from '@/utils/setSelect';
  import { error, success, warning } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  import { getTop } from '@/utils';
  export default {
    data () {
      var checkPhoneNumber = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (!validata.checkNumber(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (!validata.checkPhoneNumber(value)) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            }
          }, 100);
        } else {
          callback();
        }
      };// 电话号码正则判断

      var checkNumber = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (!validata.checkNumber(value)) {
              callback(new Error('请输入数字值'));
            } else {
              callback();
            }
          }, 100);
        } else {
          callback();
        }
      };// 可以为空,必须为数字正则判断

      var checkHundred = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (validata.checkNumber(value)) {
              if (value > 100) {
                callback(new Error('请输入小于100的值'));
              } else {
                callback();
              }
            } else {
              callback(new Error('请输入数字'));
            }
          }, 100);
        } else {
          callback();
        }
      };// 可以为空,必须为数字,比例数值1-100判断

      var checkBigNumber = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (validata.checkNumber(value)) {
              if (parseFloat(value) > 99999999) {
                callback(new Error('请输入小于99999999的值'));
              } else {
                callback();
              }
            } else {
              callback(new Error('请输入数字'));
            }
          }, 100);
        } else {
          callback();
        }
      };// 可以为空,必须为数字,数值不大于999999999999

      return {
        dynamicValidateForm: {
          pro_goodness: [{
            goodness_title: '暂无内容',
            goodness_desc: '暂无内容'
          }, {
            goodness_title: '暂无内容',
            goodness_desc: '暂无内容'
          }, {
            goodness_title: '暂无内容',
            goodness_desc: '暂无内容'
          }]
        },
        addStateDisplay: false,
        setFileDisplay: false,
        syncProjectDetailDisplay: false, // 同步弹窗
        syncDialogDisplay: false, // 一键同步提示框
        uploadAddress: this.URL.weitianshiLine + this.URL.projectUpload + localStorage.token, // 上传地址
        uploadAddressFile: this.URL.weitianshiLine + this.URL.uploadFile + localStorage.token, // 上传地址
        project_id: '', // 项目Id全局保存
        planList: [], // 商业计划书上传列表
        fileList: [], // 批量上传文件列表
        planButton: true, // 控制上传按钮的显示
        uploadShow: {// 计划书上传列表,需要存数据啦
        },
        uploadShow2: {// 上传文件展示列表,就是老夫操作的列表
          lists: [
            /* {
             bp_type: "其他",
             file_id: 2476,
             file_title: "文件2.docx",
             type: 4,
             load:true,
             uid:1501837722250
             } */
          ]
        },
        uploadDate: {user_id: localStorage.user_id}, // 商业计划书上传所带的额外的参数
        fileuploadDate: {user_id: localStorage.user_id}, // 项目文件上传带的参数
        groups: {
          input: '',
          group: [{type: '其他', label: '其他', value: '其他'}],
          type: '',
          name: ''
        }, // 分组用的所有参数
        name: '',
        show: 'detail',
        multiplelimit: 5,

        // 标签设置
        tags: {
          changepro: [], // 项目标签新增
          changeTeam: [], // 团队标签
          changesource: []// 项目来源
        },
        // 项目详情
        project: {
          goodness: {
            pro_business_model: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_goodness: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }
            ],
            pro_market_genera: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_service: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }]
          }, // 亮点
          open_status: '1', // 私密设置
          pro_area: {
            area_id: 2,
            area_title: '暂无内容', // 市级
            pid: 1// 省级
          }, // 所属地区1省级单位
          pro_company_name: '',
          pro_finance_stock_after: '0.00', // 投后股份
          pro_finance_value: '0.00', // 项目估值
          pro_industry: [
            /*              {
             industry_id: 12,
             industry_name: "",
             parent_id: 0
             } */
          ],
          pro_intro: '',
          pro_name: '',
          pro_scale: {
            scale_id: '',
            scale_money: '暂无内容'
          }, // 规模多少钱
          pro_stage: {
            sort: '',
            stage_id: 13,
            stage_name: '暂无内容'
          },
          project_id: '',
          tag: []
        },
        // 公司运营
        company: {
          pro_company_scale: {comp_scale_id: 1},
          pro_status: {status_id: 3, status_name: '暂无内容'},
          pro_website: ''
        },
        // 产品
        brands: {
          brand: [
            {
              brand_name: '',
              type_id: '',
              brand_desc: ''
            },
            {
              brand_name: '',
              type_id: '',
              brand_desc: ''
            },
            {
              brand_name: '',
              type_id: '',
              brand_desc: ''
            }
          ]
        },
        // 核心团队
        team: {
          tag: [], // 团队标签
          core_users: [
            /* {
             project_ct_id: 30,
             ct_index: "9bd0c8d7d615832340340aab0c0625b7",
             project_id: 37,
             project_index: "275fa4f135eecf08e5660d23e294e6cd",
             ct_member_name: "赵工佐",
             ct_member_career: "创始人兼首席执行官",
             ct_member_intro: "前高中和大学校队主力球员，"
             } */
          ]
        },
        // 融资信息
        financing: {
          pro_finance_use: '', // 资金用途
          // 历史融资信息
          pro_history_finance: [
            /* {
             project_id: 37,
             pro_finance_stage: 10,//轮次
             pro_finance_scale: "",//金额
             pro_finance_investor: "",//投资人
             created_at: "2017-06-20",
             updated_time: null
             } */
          ]
        },
        // 里程碑
        milepost: {
          pro_develop: [
            /* {
             project_dh_id: 6,
             dh_index: "24c2886c937e9a3eea25c7d0ffe7f713",
             project_id: 37,
             project_index: "275fa4f135eecf08e5660d23e294e6cd",
             dh_start_time: "2017-06-20 17:39:25",//时间
             dh_end_time: "1443542400",
             dh_event: "组建团队和设立办公室",//事件
             created_at: null,
             updated_at: null
             } */
          ]
        },
        // FA签约协议
        pro_FA: {
          is_exclusive: 1// 0其他 1独家 2非独家
        },
        // 仅自己可见信息
        private: {
          commission: '0.00', // 签约佣金
          contact_user_career: '',
          pro_remark: '',
          pro_source: [
            /* {

             } */
          ],
          stock_follow: '0.00',
          stock_other: '0.00',
          stock_right: '0.00', // 股权赠与
          contact_user_mobile: '',
          contact_user_name: ''
        },
        companyList: [], // 公司搜索的数据
        list: [],
        //* 公司远程搜索
        states: [],
        //* 所属地区1省级选项
        area: [],
        //* 所属地区2市级选项
        area2: [],
        //* 项目轮次选项
        stage: [],
        //* 项目领域默认选项
        industry: [],
        //* 运营状态默认值
        company_status: [],
        //* 公司规模
        company_scale: [],
        //* 项目标签
        tags_pro: [],
        // 项目来源
        tags_source: [],
        // 产品选择
        brand_type: [],

        formLabelWidth: '120px',

        //* 运营状态
        form: {
          state: ''
        },

        //* ==================团队标签=====================
        tags_team: [],
        //* ==================融资范围=====================
        scale: [],
        // 控制显示收起
        fileShow: true,
        ProjectShow: true,
        teamShow: true,
        financingShow: true,
        milepostShow: true,
        SignShow: true,
        operateShow: true, // 运营
        brandShow: true, // 产品

        // 控制锚点跳转
        node0: true,
        node1: false,
        node2: false,
        node3: false,
        node4: false,
        node5: false,
        node6: false,
        node7: false,

        //* 判断项目完整度(是否全部填写完整)
        filePerfect: false, // 项目文件
        projectPerfect: false, // 项目详情
        companyPerfect: false, // 公司运营
        brandsPerfect: false, // 产品
        teamPerfect: false, // 核心团队
        financingPerfect: false, // 融资信息
        milepostPerfect: false, // 里程碑
        privatePerfect: false, // FA业务

        // 填写有误显示
        fileMust: false, // 项目文件
        projectMust: false, // 项目详情
        companyMust: false, // 公司运营
        brandtMust: false, // 产品必填
        teamMust: false, // 核心团队
        financingMust: false, // 融资信息
        milepostMust: false, // 里程碑
        privateMust: false, // FA业务

        close: false,
        restaurants: [], // 数据存放
        loading: false, // 加载
        add_pro: [], // 添加个人标签暂存
        companyTitle: '', // 尽调搜索的公司的名称
        companyid: '', // 尽调搜索的公司的ID
        syncData: {}, // 一键同步存放的数据
        timeout: null,
        showList: false,
        loadingcheck: false,
        statusLast: 0,

        PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' }, // 电话规则
        NumberRule: { validator: checkNumber, trigger: 'blur' }, // 可以为空,必须为数字
        ScaleRule: { validator: checkHundred, trigger: 'blur' }, // 可以为空,必须为数字,比例数值1-100
        BigNumberRule: { validator: checkBigNumber, trigger: 'blur' }, // 可以为空,必须为数字,数值不大于999999999999
        one: false, // 第一次进来的时候
        submitButton: false, // 是否允许提交false允许/true不允许
        uploadLoading: false, // BP上传动画
        screenWidth: document.body.clientWidth,
        timer: null,
        timer2: null,
        scrollTop: 0,
        tagShow: 0// 控制标签显示隐藏
      };
    },
    computed: {
      // 项目完整度判断
      proportion () {
        let number = 0;// 所有的空值数
        let fileValue = this.planList;// 项目文件
        let projectValue = this.project;// 项目详情
        let companyValue = this.company;// 公司运营
        let brandsValue = this.brands;// 产品
        let teamValue = this.team;// 核心团队
        let financingValue = this.financing;// 融资信息
        let milepostValue = this.milepost;// 里程碑
        let privateValue = this.private;// 仅自己可见信息

        let sum = Object.keys(projectValue).length +// 所有数据的总长度
          Object.keys(companyValue).length +
          Object.keys(brandsValue).length +
          Object.keys(teamValue).length +
          Object.keys(financingValue).length +
          Object.keys(milepostValue).length +
          Object.keys(privateValue).length + 6;

        // 判断所有为空的数值,包括数组内的第一组
        function forFor (value) {
          let inner = 0;// 每一次调用的空值
          if (isArray(value)) {
            if (value.length === 0) {
              number++;
              inner++;
            };
          } else {
            for (let key in value) {
              if (isArray(value[key])) {
                if (value[key].length === 0) {
                  number++;
                  inner++;
                }
                /* else {
                 for (let key2 in value[key][0]) {
                 if (value[key][0][key2] == "") {
                 number++;
                 inner++;
                 }
                 }
                 } */
              } else if (value[key] === '') {
                number++;
                inner++;
              }
            }
          }
          return inner;
        }

        // 是否为数组
        function isArray (o) {
          return Object.prototype.toString.call(o) === '[object Array]';
        }

        if (forFor(fileValue) === 0) this.filePerfect = true;
        else this.filePerfect = false;

        if (forFor(projectValue) !== 0) this.projectPerfect = false;
        else if (this.project.goodness.pro_goodness.goodness_desc === '' || this.project.goodness.pro_goodness.goodness_title === '') { this.projectPerfect = false; } else this.projectPerfect = true;

        if (forFor(companyValue) === 0) this.companyPerfect = true;
        else this.companyPerfect = false;

        if (forFor(brandsValue) === 0) this.brandsPerfect = true;
        else this.brandsPerfect = false;

        if (forFor(teamValue) === 0) this.teamPerfect = true;
        else this.teamPerfect = false;

        if (forFor(financingValue) === 0) this.financingPerfect = true;
        else this.financingPerfect = false;

        if (forFor(milepostValue) === 0) this.milepostPerfect = true;
        else this.milepostPerfect = false;

        if (forFor(privateValue) === 0) this.privatePerfect = true;
        else this.privatePerfect = false;

        return parseInt(((sum - number) / sum) * 100);
      }
    },
    mounted () {
      let leftWidth = document.getElementById('wid').offsetLeft + 935;
      this.$refs.right.style.left = leftWidth + 'px';
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
        })();
      };
      window.onscroll = () => {
        return (() => {
          that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        })();
      };
    },
    components: {
      syncprojectdetail
    },
    methods: {
      // 获得项目亮点焦点
      focus (e) {
        this.tagShow = e;
      },
      // 取消项目亮点焦点
      blur (e) {
        this.tagShow = 0;
      },
      // 获取列表各种数据
      // 获取运营状态
      getCompanyStatus (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].status_id;
          obj.value = data[i].status_name;
          arr.push(obj);
        }
        arr.push({label: '自定义添加', value: '自定义添加'});
        return arr;
      },
      // 获取项目分组信息
      getFileType (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].type_name;
          obj.value = data[i].type_id;
          arr.push(obj);
        }
        return arr;
      },
      // 设置文件分组标签
      setFileType () {
        return new Promise((resolve, reject) => {
          this.$http.post(this.URL.getFileType, {user_id: localStorage.user_id})
            .then(res => {
              let data = res.data.data;
              this.groups.group = this.getFileType(data);
              resolve(4);
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      // 获取所有下拉框的数据
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          setTimeout(() => {
            this.area = this.$global.data.area;// 设置城市1列表
            this.scale = this.$global.data.scale;// 设置期望融资
            this.stage = this.$global.data.stage;// 设置轮次信息
            this.industry = this.$global.data.industry;// 设置轮次信息
            this.company_status = this.$global.data.company_status;// 设置运营状态
            this.company_scale = this.$global.data.company_scale;// 设置公司规模几人
            this.tags_pro = this.$global.data.tags_pro;// 设置项目标签
            this.tags.changepro = this.$global.data.tags_pro;// 设置项目标签2另外的
            this.tags_team = this.$global.data.tags_team;// 设置团队标签
            this.tags.changeTeam = this.$global.data.tags_team;// 设置团队标签
            this.tags_source = this.$global.data.pro_source;// 设置项目来源
            this.brand_type = this.$global.data.brand_type;// 设置产品来源
            this.tags.changesource = this.$global.data.pro_source;// 设置项目来源
            resolve(2);
          }, 200);
        });
      },
      // 设置二级城市下拉列表
      area1Change (data) {
        this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})// pid省
          .then(res => {
            let data = res.data.data;
            this.area2 = getCity(data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 设置二级城市下拉列表2
      area1Change2 (data) {
        let newData = data;
        if (data !== '') {
          let pid = localStorage.pid;
          this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})// pid省
            .then(res => {
              let data = res.data.data;
              this.area2 = getCity(data);
              if (Number.parseInt(newData) === Number.parseInt(pid)) {
              } else {
                this.project.pro_area.area_id = '';
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      // 获取项目详情
      // 设置批量上传文件显示
      setUploadShow2 (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].belongs_to_type == null) {
            data[i].belongs_to_type = {type_name: '其他'};
          };
          this.addDomain(data[i].belongs_to_type.type_name, data[i].file_title + '.' + data[i].file_ext, data[i].file_id, data[i].belongs_to_type.type_id);
        }
      },
      // 获取项目详情数据
      getProjectDetail () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: this.project_id})
            .then(res => {
              if (res.data.status_code === 430004) {
                warning('找不到项目');
                this.loading = false;
                this.$router.push({name: 'index'});// 路由传参
              } else {
                this.uploadShow2.lists = [];
                let data = res.data.data;
                // 项目文件设置=============================================

                // 计划书清空
                if (data.file.pro_BP.length === 0) {
                  this.planList = []; this.uploadShow = {};
                } else {
                  this.planList = [{name: data.file.pro_BP.file_title + '.' + data.file.pro_BP.file_ext, url: data.file.pro_BP.file_url}];// 设置计划书
                  this.uploadShow = {
                    file_title: data.file.pro_BP.file_title,
                    pro_intro: data.file.pro_BP.file_title,
                    pro_name: data.file.pro_BP.file_title,
                    project_id: this.project_id,
                    file_id: data.file.pro_BP.file_id
                  };// 设置计划书上传列表
                }

                delete data.project.pro_schedule;

                if (this.planList.length !== 0) this.planButton = false;
                else this.planButton = true;// 判断计划书上传按钮显示被否
                this.setUploadShow2(data.file.pro_file);// 设置项目文件上传列表

                // 项目介绍设置=============================================
                if (data.project.pro_area.length === 0) {
                  data.project.pro_area = {area_id: '', pid: ''};
                }

                if (data.project.pro_scale === '') {
                  data.project.pro_scale = {scale_id: ''};
                }

                this.area1Change(data.project.pro_area.pid);// 取到省级设置市级
                if (data.project.pro_stage === '') {
                  data.project.pro_stage = {stage_id: ''};
                }// 轮次设置
                data.project.pro_industry = formatData.setIdToArr(data.project.pro_industry, 'industry_id');// 领域标签取出id
                this.companyTitle = data.project.pro_company_name;
                localStorage.pid = data.project.pro_area.pid;

                data.project.tag = formatData.setIdToArr(data.project.tag, 'tag_id');// 设置项目标签
                data.project.open_status = data.project.open_status.toString();// 私密设置
                if (data.project.pro_finance_stock_after === 0) data.project.pro_finance_stock_after = '';// 投后股份

                if (data.project.pro_finance_value === 0) data.project.pro_finance_value = '';// 项目估值
                this.project = data.project;
                // 亮点设置=============================================addgoodNess1pro_servicepro_business_model
                if (data.project.goodness.pro_goodness.length === 0) {
                  for (let i = 0; i < 5 - data.project.goodness.pro_goodness.length; i++) {
                    this.addgoodNess();
                  }
                } else if (data.project.goodness.pro_goodness.length < 3) {
                  this.project.goodness.pro_goodness = data.project.goodness.pro_goodness;
                  for (let i = 0; i < 4 - data.project.goodness.pro_goodness.length; i++) {
                    this.addgoodNess();
                  }
                } else if (data.project.goodness.pro_goodness.length >= 3) {
                  this.project.goodness.pro_goodness = data.project.goodness.pro_goodness;
                }

                if (data.project.goodness.pro_market_genera.length === 0) {
                  for (let i = 0; i < 5 - data.project.goodness.pro_market_genera.length; i++) {
                    this.addgoodNess1();
                  }
                } else if (data.project.goodness.pro_market_genera.length < 3) {
                  this.project.goodness.pro_market_genera = data.project.goodness.pro_market_genera;
                  for (let i = 0; i < 4 - data.project.goodness.pro_market_genera.length; i++) {
                    this.addgoodNess1();
                  }
                } else if (data.project.goodness.pro_market_genera.length >= 3) {
                  this.project.goodness.pro_market_genera = data.project.goodness.pro_market_genera;
                }

                if (data.project.goodness.pro_service.length === 0) {
                  for (let i = 0; i < 5 - data.project.goodness.pro_service.length; i++) {
                    this.addgoodNess2();
                  }
                } else if (data.project.goodness.pro_service.length < 3) {
                  this.project.goodness.pro_service = data.project.goodness.pro_service;
                  for (let i = 0; i < 4 - data.project.goodness.pro_service.length; i++) {
                    this.addgoodNess2();
                  }
                } else if (data.project.goodness.pro_service.length >= 3) {
                  this.project.goodness.pro_service = data.project.goodness.pro_service;
                }

                if (data.project.goodness.pro_business_model.length === 0) {
                  for (let i = 0; i < 5 - data.project.goodness.pro_business_model.length; i++) {
                    this.addgoodNess3();
                  }
                } else if (data.project.goodness.pro_business_model.length < 3) {
                  this.project.goodness.pro_business_model = data.project.goodness.pro_business_model;
                  for (let i = 0; i < 4 - data.project.goodness.pro_business_model.length; i++) {
                    this.addgoodNess3();
                  }
                } else if (data.project.goodness.pro_business_model.length >= 3) {
                  this.project.goodness.pro_business_model = data.project.goodness.pro_business_model;
                }
                // 公司运营设置=============================================

                if (data.company.pro_company_scale === '') {
                  data.company.pro_company_scale = {comp_scale_id: 1};
                }// 规模为空的时候
                if (data.company.pro_status === '') {
                  data.company.pro_status = {status_id: 3};
                }// 规模为空的时候
                this.statusLast = data.company.pro_status.status_id;// 运营状态多余的

                this.company = data.company;

                // 产品设置=============================================
                this.brands = data.brands;
                // 核心团队设置=============================================
                data.team.tag = formatData.setIdToArr(data.team.tag, 'tag_id');// 团队标签
                formatData.setZeroToNull(data.team.core_users, 'stock_scale');// 项目成员
                if (data.team.core_users === '') data.team.core_users = [];// 项目成员为空判断
                this.team = data.team;

                // 融资信息设置=============================================
                formatData.setZeroToNull(data.financing.pro_history_finances, 'pro_finance_scale');// 设置历史融资信息
                formatData.setTimeToReallyTime(data.financing.pro_history_finance, 'finance_time');// 历史融资信息时间格式设置
                if (data.financing.pro_history_finance === '') data.financing.pro_history_finance = [];
                this.financing = data.financing;

                // 里程碑设置=============================================
                formatData.setTimeToReallyTime(data.milepost.pro_develop, 'dh_start_time');// 里程碑时间格式设置
                this.milepost = data.milepost;

                // FA业务=============================================
                this.pro_FA = data.pro_FA;

                // FA业务仅自己可见=============================================
                data.private.pro_source = formatData.setIdToArr(data.private.pro_source, 'tag_id');// 项目来源标签
                if (data.private.commission === 0) data.private.commission = '';
                if (data.private.stock_right === 0) data.private.stock_right = '';
                if (data.private.stock_follow === 0) data.private.stock_follow = '';
                if (data.private.stock_other === 0) data.private.stock_other = '';

                this.private = data.private;

                this.loading = false;
                this.tags_pro = this.tags.changepro.slice(0);
                this.tags_team = this.tags.changeTeam.slice(0);
                this.tags_source = this.tags.changesource.slice(0);
                resolve(3);
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        });
      },
      // 商业计划书
      planChange (file, fileList) {
        this.planList = fileList;
        if (file.status === 'fail') this.planButton = true;
        else this.planButton = false;
      },
      // 上传成功后添加字段
      planuploadsuccess (response, file, fileList) {
        success('上传成功');
        let data = response.data;
        this.addplan(data.bp_title, data.pro_intro, data.pro_name, data.project_id, data.file_id);
        this.uploadLoading = false;
        this.submitButton = false;
      },
      // 上传失败
      planuploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
      },
      // 删除文件
      planRemove (file, fileList) {
        if (fileList.length === 0) this.planButton = true;
        else {
          this.planButton = true;
          this.submitButton = false;
        }
        this.uploadLoading = false;
        this.$http.post(this.URL.deleteAtUpload, {user_id: localStorage.user_id, project_id: this.uploadShow.project_id})
          .then(res => {
            if (res.status === 200) {
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err);
//            this.alert("删除失败,请联系管理员")
          });
      },
      // 添加上传文件时,保存返回的数据
      addplan (fileTitle, proIntro, proName, projectId, fileId) {
        let object = {};
        object.file_title = fileTitle;
        object.pro_intro = proIntro;
        object.pro_name = proName;
        object.project_id = projectId;
        object.file_id = fileId;
        this.uploadShow = object;
      },
      // 点击下载
      planPreview (file) {
        const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + this.uploadShow.file_id;
        window.open(url);
      },
      // 上传前的验证
      beforeUpload (file) {
        this.fileuploadDate.project_id = this.project_id;
        this.uploadDate.project_id = this.project_id;
        let filetypes = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.zip', '.rar'];
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf('.')).toLowerCase();
        let isnext = false;
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === fileend) {
              isnext = true;
              break;
            }
          }
        }
        this.loading = false;
        if (!isnext) {
          error('不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(52428810)) {
          error('暂不支持超过50M文件上传哦');
          return false;
        };
        this.uploadLoading = true;
        this.submitButton = true;
      },
      // 取消上传
      cancelUpload (file) {
        this.$refs.upload.abort(file);
        this.deleteLoad(file.uid);
        this.subButtonCheck(this.uploadShow2.lists);
      },
      //* 批量上传
      beforeUpload1 (file) {
        this.fileuploadDate.project_id = this.project_id;
        this.uploadDate.project_id = this.project_id;
        let filetypes = ['.doc', '.ppt', '.pdf', '.zip', '.rar', '.pptx', '.png', '.jpg', '.docx', '.jpeg'];
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf('.')).toLowerCase();
        let isnext = false;
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === fileend) {
              isnext = true;
              break;
            }
          }
        }
        this.loading = false;
        if (!isnext) {
          error('不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(52428810)) {
          error('暂不支持超过50m文件上传哦');
          return false;
        };
        this.addDomain('其他', file.name, 0, 4, true, file.uid);
        this.subButtonCheck(this.uploadShow2.lists);
      }, // 项目文件上传验证
      // 当添加文件时,添加入上传列表
      handleChange (file, fileList) {
        this.loading = true;
        if (this.loadingcheck) {
          this.loading = false;
          this.loadingcheck = false;
        }
        this.subButtonCheck(this.uploadShow2.lists);
      },
      uploadsuccess (response, file, fileList) {
        let data = response.data;
        this.deleteLoad(file.uid);
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type, false, file.uid);
        this.loadingcheck = true;
        this.subButtonCheck(this.uploadShow2.lists);
      },
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
        this.loadingcheck = false;
        this.loading = false;
      },
      // 点击下载
      download (item) {
        let index = this.uploadShow2.lists.indexOf(item);
        if (index !== -1) {
          let fileId = this.uploadShow2.lists[index].file_id;
          const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + fileId;
          window.open(url);
        }
      },
      // 删除当前上传文件
      removeList (item) {
        var index = this.uploadShow2.lists.indexOf(item);
        if (index !== -1) {
          this.fileList.splice(index, 1);
          const deleteAtFile = this.URL.deleteAtFile;
          this.$http.post(deleteAtFile, {
            user_id: localStorage.user_id,
            project_id: item.project_id,
            file_id: item.file_id
          })
            .then(res => {
              if (res.status === 200) {
                this.loading = false;
                this.uploadShow2.lists.splice(index, 1);
              }
            })
            .catch(err => {
              console.log(err);
              error('删除失败,请联系管理员');
            });
        }
      },
      // 添加上传文件时,加入显示列表
      addDomain (typeName, fileTitle, fileId, type, load, uid) {
        let object = {};
        object.bp_type = typeName;
        object.file_title = fileTitle;
        object.file_id = fileId;
        object.type = type;// 文件类型
        object.load = load;// 是否在上传中
        object.uid = uid;// 文件唯一标识
        this.uploadShow2.lists.push(object);
      },
      // 剔除Load
      deleteLoad (uid) {
        let lists = this.uploadShow2.lists;// 所有的文件的数组
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].uid === uid) {
            lists.splice(i, 1);
          }
        }
      },
      // 当文件没有全部上传完时,不能提交
      subButtonCheck (arr) {
        if (arr.length === 0) {
          this.submitButton = false;
          return false;
        }
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].load) {
            this.submitButton = true;
            return false;
          } else {
            this.submitButton = false;
          }
        }
      },
      // 点击文件分组设置中的单选框
      groupchange (label) {
        let index = this.groups.index;
        let data = this.groups.group;
        for (let i = 0; i < data.length; i++) {
          if (data[i].value === label) {
            this.groups.name = data[i].label;
            this.uploadShow2.lists[index].type = label;
          }
        }
      },
      // 添加文件分组设置的分组选项
      addGroup (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.URL.createFileType, {
              user_id: localStorage.user_id,
              type_name: this.groups.input
            })
              .then(res => {
                let data = res.data;
                let newObj = {};
                newObj.type = this.groups.input;
                newObj.label = this.groups.input;
                newObj.value = data.type_id;
                this.groups.type = data.type_id;
                this.groups.group.push(newObj);
                this.groups.input = '';
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 发送文件分组设置请求
      saveGroupChange () { // file_id type_id user_id
        // let type = this.groups.bp_type;
        let index = this.groups.index;
        let typeName = this.groups.name;
        this.$http.post(this.URL.setFileType, {
          user_id: localStorage.user_id,
          file_id: this.uploadShow2.lists[index].file_id,
          type: this.uploadShow2.lists[index].type
        })
          .then(res => {
            if (index !== -1) {
              this.uploadShow2.lists[index].bp_type = typeName;
              this.setFileDisplay = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取文件分组的位置
      toGroup (item) {
        this.groups.type = item.type;
        var index = this.uploadShow2.lists.indexOf(item);
        this.groups.index = index;
        this.setFileDisplay = true;
      },

      openDiv (v) {
        this[v] = true;
      },
      closeDiv (v) {
        this[v] = false;
      },
      // 返回上一层
      goBack () {
        this.zgClick('退出编辑项目');
        this.$router.go(-1);
      },
      // 获取远程数据模拟
      loadData (arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].project_name === '' ? arr[i].company_name : arr[i].company_name + '(' + arr[i].project_name + ')';
          obj.address = arr[i].com_id;
          obj.company_name = arr[i].company_name;
          newArr.push(obj);
        }
        return newArr;
      },
      // 自动搜索,接口写这里面
      querySearchAsync (queryString, cb) {
        if (queryString.length > 2) {
          this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
            .then(res => {
              this.restaurants = [];
              let data = res.data.data;
              this.restaurants = this.loadData(data);
              if (queryString === '') this.restaurants = [];
              let restaurants = this.restaurants;
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(restaurants);
              }, 300);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          let callback = [];
          cb(callback);
        }
      },
      // 选择了搜索出来的数据后
      handleSelect (item) {
        this.companyTitle = item.company_name;
        this.companyid = item.address;
        this.project.pro_company_name = item.company_name;
      },
      // 控制添加radio
      radiochange (label) {
        if (label === '自定义添加') {
          this.addStateDisplay = true;
        }
      },
      // 取消后添加运营状态
      cancelGroupChange () {
        this.addStateDisplay = false;
        this.company.pro_status.status_id = this.statusLast;
      },
      // 添加运营状态
      addState () {
        this.$http.post(this.URL.createStatusPro, {user_id: localStorage.user_id, status_name: this.form.state})
          .then(res => {
            let data = res.data;
            let newState = {};
            newState.label = data.status_id;
            newState.value = this.form.state;
//            this.project.companystate = this.form.state;
            this.company_status.splice(length - 1, 0, newState);
            this.addStateDisplay = false;
            this.company.pro_status.status_id = data.status_id;
            this.statusLast = data.status_id;
            this.form.state = '';
          })
          .catch(err => {
            error('添加失败');
            console.log(err);
          });
      },
      // 添加项目标签
      addChangepro (e) {
        let tagName = formatData.checkArr(e, this.tags_pro);
        if (tagName !== undefined) {
          this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 0, tag_name: tagName})
            .then(res => {
              let newState = {};
              newState.label = tagName;
              newState.value = res.data.tag_id;
              this.tags.changepro.push(newState);
            })
            .catch(err => {
              error('添加失败');
              console.log(err);
            });
        }
      },
      // 添加团队标签
      addChangeTeam (e) {
        let tagName = formatData.checkArr(e, this.tags_team);

        if (tagName !== undefined) {
          this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 1, tag_name: tagName})
            .then(res => {
              let newState = {};
              newState.label = tagName;
              newState.value = res.data.tag_id;
//              this.tags_team.push(newState);
              this.tags.changeTeam.push(newState);
              /* this.tags.changeTeam.push(res.data.tag_id); */
            })
            .catch(err => {
              error('添加失败');
              console.log(err);
            });
        }
      },
      // 添加项目来源
      addChangesource (e) {
        let tagName = formatData.checkArr(e, this.tags_source);

        if (tagName !== undefined) {
          this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 2, tag_name: tagName})
            .then(res => {
              let newState = {};
              newState.label = tagName;
              newState.value = res.data.tag_id;
              this.tags.changesource.push(newState);
            })
            .catch(err => {
              error('添加失败');
              console.log(err);
            });
        }
      },
      // 添加投资亮点
      addgoodNess () {
        this.project.goodness.pro_goodness.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_goodness'
        });
      },
      // 删除投资亮点
      removegoodNess (item) {
        var index = this.project.goodness.pro_goodness.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_goodness.splice(index, 1);
        }
      },
      // 添加市场概况
      addgoodNess1 () {
        this.project.goodness.pro_market_genera.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_market_genera'
        });
      },
      // 删除市场概况
      removegoodNess1 (item) {
        var index = this.project.goodness.pro_market_genera.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_market_genera.splice(index, 1);
        }
      },
      // 添加产品概况pro_servicepro_business_model
      addgoodNess2 () {
        this.project.goodness.pro_service.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_service'
        });
      },
      // 删除产品概况
      removegoodNess2 (item) {
        var index = this.project.goodness.pro_service.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_service.splice(index, 1);
        }
      },
      // 添加商业模式pro_business_model
      addgoodNess3 () {
        this.project.goodness.pro_business_model.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_business_model'
        });
      },
      // 删除商业模式
      removegoodNess3 (item) {
        var index = this.project.goodness.pro_business_model.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_business_model.splice(index, 1);
        }
      },
      // 添加产品
      addBrand () {
        this.brands.brand.push({
          brand_desc: '',
          brand_name: '',
          type_id: '',
          brand_id: ''
        });
      },
      removeBrand (item) {
        if (item.brand_id === '' || item.brand_id == null) {
          let index = this.brands.brand.indexOf(item);
          if (index !== -1) {
            this.brands.brand.splice(index, 1);
          }
        } else {
          this.$http.post(this.URL.deleteBrand, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            brand_id: item.brand_id
          })
            .then(res => {
              success('删除成功');
              let index = this.brands.brand.indexOf(item);
              if (index !== -1) {
                this.brands.brand.splice(index, 1);
              }
            })
            .catch(err => {
              error('删除失败');
              console.log(err);
            });
        }
      },
      // 添加团队成员
      addMember () {
        this.team.core_users.push({
          ct_member_name: '',
          ct_member_career: '',
          stock_scale: '',
          ct_member_intro: '',
          project_ct_id: ''
        });
      },
      removeMember (item) {
        if (item.project_ct_id === '' || item.project_ct_id == null) {
          let index = this.team.core_users.indexOf(item);
          if (index !== -1) {
            this.team.core_users.splice(index, 1);
          }
        } else {
          this.$http.post(this.URL.deleteCoreTeam, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            project_ct_id: item.project_ct_id
          })
            .then(res => {
              success('删除成功');
              let index = this.team.core_users.indexOf(item);
              if (index !== -1) {
                this.team.core_users.splice(index, 1);
              }
            })
            .catch(err => {
              error('删除失败');
              console.log(err);
            });
        }
      },
      // 添加历史融资信息
      addHistory () {
        this.financing.pro_history_finance.push({
          finance_time: '',
          pro_finance_stage: '',
          pro_finance_scale: '',
          pro_finance_investor: '',
          history_id: ''
        });
      },
      removeHistory (item) {
        if (item.history_id === '' || item.history_id == null) {
          let index = this.financing.pro_history_finance.indexOf(item);
          if (index !== -1) {
            this.financing.pro_history_finance.splice(index, 1);
          }
        } else {
          this.$http.post(this.URL.deleteFinance, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            history_id: item.history_id
          })
            .then(res => {
              success('删除成功');
              let index = this.financing.pro_history_finance.indexOf(item);
              if (index !== -1) {
                this.financing.pro_history_finance.splice(index, 1);
              }
            })
            .catch(err => {
              error('删除失败');
              console.log(err);
            });
        }
      },
      // 添加里程碑
      addmilePost () {
        this.milepost.pro_develop.push({
          dh_start_time: '',
          dh_event: '',
          history_id: '',
          project_dh_id: ''
        });
      },
      removemilePost (item) {
        if (item.project_dh_id === '' || item.project_dh_id == null) {
          let index = this.milepost.pro_develop.indexOf(item);
          if (index !== -1) {
            this.milepost.pro_develop.splice(index, 1);
          }
        } else {
          this.$http.post(this.URL.deleteDevelop, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            project_dh_id: item.project_dh_id
          })
            .then(res => {
              success('删除成功');
              let index = this.milepost.pro_develop.indexOf(item);
              if (index !== -1) {
                this.milepost.pro_develop.splice(index, 1);
              }
            })
            .catch(err => {
              error('删除失败');
              console.log(err);
            });
        }
      },
      // 投资亮点循环一条必填
      oneCheck (item) {
        var check = true;
        for (let i = 0; i < item.length; i++) {
          if (item[i].goodness_title !== '' && item[i].goodness_desc !== '') {
            check = false;
            return check;
          } else {
            check = true;
          }
        }
        return check;
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 全部保存按钮
      allSave () {
        const submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('project', 'projectMust');
            this.submitForm('company', 'companyMust');
            this.submitForm('brands', 'brandtMust');
            this.submitForm('team', 'teamMust');
            this.submitForm('financing', 'financingMust');
            this.submitForm('milepost', 'milepostMust');
            this.submitForm('private', 'privateMust');
            resolve(true);
          });
        };

        const check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.projectMust) {
              } else if (this.brandtMust) {
              } else if (this.teamMust) {
              } else if (this.financingMust) {
              } else if (this.milepostMust) {
              } else if (this.privateMust) {
              } else if (this.oneCheck(this.project.goodness.pro_goodness)) {
                error('投资亮点最少填写一条');
              } else {
                resolve(true);
              }
            }, 200);
          });
        };

        submit()
          .then((data) => {
            return check();
          })
          .then((data) => {
            if (data) {
              this.zgClick('提交编辑项目');
              this.loading = true;
              let allData = {};
              formatData.setTag(this.project.tag, this.tags.changepro);// 标签设置,去处ID存入数组
              formatData.setTag(this.team.tag, this.tags.changeTeam);// 标签设置,去处ID存入数组
              formatData.setTag(this.private.pro_source, this.tags.changesource);// 标签设置,去处ID存入数组
              allData.project = validata.simpleClone(this.project);
              allData.company = validata.simpleClone(this.company);
              allData.brands = validata.simpleClone(this.brands);
              allData.team = validata.simpleClone(this.team);
              allData.financing = validata.simpleClone(this.financing);
              allData.milepost = validata.simpleClone(this.milepost);
              allData.pro_FA = validata.simpleClone(this.pro_FA);
              allData.private = validata.simpleClone(this.private);
              allData.user_id = localStorage.user_id;// 用户id
              allData.pro_total_score = this.proportion;// 完整度
              allData.project_id = this.project.project_id;// 项目id

              formatData.setReallyTimeToTime(allData.financing.pro_history_finance, 'finance_time', 'finance_time_stamp');// 标准时间转化为时间戳
              formatData.setReallyTimeToTime(allData.milepost.pro_develop, 'dh_start_time', 'dh_start_time_stamp');// 标准时间转化为时间戳

              formatData.setNullToZero(allData.team.core_users, 'stock_scale');// 核心成员股权比例如果没填,就给0
              formatData.setNullToZero(allData.financing.pro_history_finance, 'pro_finance_scale');// 期望融资,融资金额如果没填,就给0

              allData.project.pro_finance_value = allData.project.pro_finance_value + '';// 数字转字符串
              allData.project.pro_schedule = '';// 项目进度

              if (allData.private.stock_right === '' || allData.private.stock_right === undefined) allData.private.stock_right = 0;// 股权赠与
              if (allData.private.commission === '' || allData.private.commission === undefined) allData.private.commission = 0;// 签约佣金

              allData.company.pro_company_scale = allData.company.pro_company_scale.comp_scale_id;
              allData.company.pro_status = allData.company.pro_status.status_id;

              this.$http.post(this.URL.editProject, allData)
                .then(res => {
                  this.loading = false;
                  this.open2('项目编辑成功', '您当前的项目完整度为' + this.proportion + '%', '查看详情', '返回列表');
                })
                .catch(err => {
                  this.loading = false;
                  error('编辑失败');
                  console.log(err);
                });
            }
          });
      },
      // 编辑成功弹窗
      open2 (title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.$router.push({name: 'projectDetails', query: {project_id: this.project_id}});
        }).catch(() => {
          this.$router.push({name: 'myProject', query: {activeTo: 0}});
        });
      },
      // 锚点跳转
      setNode (v) {
        this.node0 = false;
        this.node1 = false;
        this.node2 = false;
        this.node3 = false;
        this.node4 = false;
        this.node5 = false;
        this.node6 = false;
        this.node7 = false;
        this['node' + v] = true;
        switch (v) {
          case '0':
            this.fileShow = true;
            break;
          case '1':
            this.ProjectShow = true;
            break;
          case '2':
            this.operateShow = true;
            break;
          case '3':
            this.brandShow = true;
            break;
          case '4':
            this.teamShow = true;
            break;
          case '5':
            this.financingShow = true;
            break;
          case '6':
            this.milepostShow = true;
            break;
          case '7':
            this.SignShow = true;
            break;
          default:
            this.fileShow = true;
            break;
        };
        let jump = document.querySelectorAll('.d_jump');
        // 获取需要滚动的距离
        let total = jump[v].offsetTop;
        let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50;
        if (total > distance) {
          smoothDown();
        } else {
          let newTotal = distance - total;
          step = newTotal / 50;
          smoothUp();
        }
        function smoothDown () {
          if (distance < total) {
            distance += step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            window.pageYOffset = distance;
            setTimeout(smoothDown, 10);
          } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
            window.pageYOffset = total;
          }
        }

        function smoothUp () {
          if (distance > total) {
            distance -= step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            window.pageYOffset = distance;
            setTimeout(smoothUp, 10);
          } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
            window.pageYOffset = total;
          }
        }
      },
      // 一键同步按钮
      // 点击同步按钮
      syncOne () {
        this.companyTitle = this.project.pro_company_name;
        if (this.companyTitle === '') {
          warning('请先填写公司名称');
        } else {
          this.loading = true;
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.companyTitle})
            .then(res => {
              let data = res.data.data;
              if (data.length !== 0) {
                this.companyid = data.company.com_id;
                this.syncDialogDisplay = true;
              } else {
                warning('未查询到该公司信息，无法获取');
              }
              this.loading = false;
            })
            .catch(err => {
              error('获取失败');
              console.log(err);
              this.loading = false;
            });
        }
      },
      // 项目详情弹窗关闭函数
      changeSyncProjectDetail (msg) {
        this.syncProjectDetailDisplay = msg;
        this.syncDialogDisplay = false;
      },
      // 获取id
      getprojectId () {
        this.project_id = this.$route.query.project_id || '';
        this.project.project_id = this.$route.query.project_id || '';
      },
      // 开始同步信息(是否覆盖信息)
      syncCompanyData (msg) {
        this.loading = true;
        this.syncDialogDisplay = false;
        let syncDataCheck = this.$store.state.syncData;
        let syncData = syncDataCheck.data;
        let checkList = syncDataCheck.checkedSync;
        if (msg.updateCategory) {               // 看是否需要更新标签
          this.$global.func.getWxProjectCategory()
            .then((data) => {
              return this.getWxProjectCategory();
            }).then((data) => {
              syncDataFunc();
            });
        } else {
          this.getWxProjectCategory()
            .then((data) => {
              syncDataFunc();
            });
        }

        // 数据同步函数
        const syncDataFunc = () => {
          syncData.project.pro_industry = formatData.setIdToArr(syncData.project.pro_industry, 'industry_id');// 领域标签取出id
          syncData.project.open_status = syncData.project.open_status.toString();// 字符串化
          if (syncData.project.pro_stage.length === 0) {
            syncData.project.pro_stage = {};
            syncData.project.pro_stage = {stage_id: ''};
          };
          if (syncData.project.pro_industry.length === 0) { syncData.project.pro_industry = []; }
          formatData.setTimeToReallyTime(syncData.milepost.pro_develop, 'dh_start_time');// 里程碑时间格式设置
          formatData.setTimeToReallyTime(syncData.financing.pro_history_finance, 'finance_time');// 里程碑时间格式设置
          if (syncData.company.pro_company_scale === '') { syncData.company.pro_company_scale = {comp_scale_id: ''}; }
          // 数据格式化

          if (msg.cover) {
            // 覆盖的时候
            checkList.forEach((x) => {
              for (let index in syncData) { // 需要同步那些数据
                if (x === index) {
                  if (x === 'project' || x === 'company') {   // 因为不是数组,单独处理
                    for (let key in syncData[index]) {
                      if (key !== 'pro_area') {            // 后端都没有,跳过处理
                        this[x][key] = syncData[index][key];
                      } else {
                        this.project.pro_area.pid = syncData[index][key].pid;
                        this.area1Change(syncData[index][key].pid);
                        localStorage.pid = syncData[index][key].pid;
                        setTimeout(() => { this.project.pro_area.area_id = syncData[index][key].area_id; }, 100);
                      }
                    }
                  } else {
                    for (let key in syncData[index]) {
                      this[x][key] = syncData[index][key];
                    }
                  }
                }
              }
            });
          } else {
            // 不覆盖
            checkList.forEach((x) => {
              for (let index in syncData) {
                if (x === index) {
                  if (x === 'project' || x === 'company') {
                    for (let key in syncData[index]) {
                      if (key === 'pro_area') {            // 地区需要单独处理
                        if (this.project.pro_area.pid === '') {
                          this.project.pro_area.pid = syncData[index][key].pid;
                          this.area1Change(syncData[index][key].pid);
                          localStorage.pid = syncData[index][key].pid;
                          setTimeout(() => { this.project.pro_area.area_id = syncData[index][key].area_id; }, 100);
                        }
                      } else if (key === 'pro_stage') {       // 项目轮次单独处理
                        if (this.project.pro_stage.stage_id === '') {
                          this[x][key] = syncData[index][key];
                        }
                      } else if (validata.isArray(this[x][key])) { // 标签需要数组合并
                        this[x][key] = [...this[x][key], ...syncData[index][key]];// 数组合并
                      } else if (this[x][key] === '') { // 其他为空是不覆盖
                        this[x][key] = syncData[index][key];
                      }
                    }
                  } else {
                    for (let Arrkey in syncData[index]) {
                      if (validata.isArray(syncData[index][Arrkey])) {
                        if (Arrkey !== 'tag') {
                          this[x][Arrkey] = [...this[x][Arrkey], ...syncData[index][Arrkey]];// 数组合并
                        }
                      }
                    }
                  }
                }
              }
            });
          }
          this.loading = false;
        };
      }
    },
    // 当dom一创建时
    created () {
      getTop();
      this.loading = true;
      this.getprojectId();
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.setFileType();
        })
        .then((data) => {
          return this.getProjectDetail();
        });
      this.ProjectShow = true;
      this.teamShow = false;
      this.financingShow = false;
      this.milepostShow = false;
      this.SignShow = false;
      this.operateShow = false;
      this.brandShow = false;
    },
    watch: {
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.$refs.right.style.left = that.$refs.left.offsetLeft + 935 + 'px';
            that.timer = false;
          }, 100);
        }
      },
      scrollTop (val) {
        if (!this.timer2) {
          this.scrollTop = val;
          this.timer2 = true;
          let that = this;
          setTimeout(function () {
            if (that.scrollTop > 90) {
              that.$refs.right.style.top = 80 + 'px';
            } else {
              that.$refs.right.style.top = 153 + 'px';
            }
            that.timer2 = false;
          }, 100);
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
.goodness .el-input__inner{
   margin-top: 10px;
  margin-bottom: 10px;
}

  .planUpload {
    .el-upload {
      display: block;
    }
    .el-upload-list__item {
      /*    width: 200px;*/
    }
    .el-upload-list__item-name {
      font-size: 14px;
      color: #475669;
      letter-spacing: 0;
      text-decoration: underline
    }
  }

  #editproject {
    .el-dialog--tiny{
      width: 400px;
      top:35%!important;
    }
    .uploadImg{
      width: 15px;
      height: 15px;
      display: inline-block;
      img{
        width: 100%;
      }
    }
    .marginAuto{
      display: block;
      margin: 0 auto;
      width: 246px;
      height: 32px;
      margin-bottom: 20px;
      .addhover{
        display: inline-block;
        position:relative;
      }
      .addhover:hover .addmemberimg{
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
      }
      .addMember {
        transition: all .5s;
        font-size:16px;
        color:#009eff;
      }
      /*.addmemberimg:hover i{*/
        /*transform: rotate(360deg);*/
        /*-webkit-transform: rotate(360deg);*/
        /*-moz-transform: rotate(360deg);*/
        /*-o-transform: rotate(360deg);*/
        /*-ms-transform: rotate(360deg);*/
      /*}*/
      .addMember2{
        margin-left: 22px;
      }
      .addmemberimg{
        transform:  rotate(0) ;
          display: inline-block;
          float: left;
          margin-top: 11px;
          width: 17px;
          height: 17px;
          margin-right: 7px;
          transition: all .5s;
          img{
            width:100%;
          }
      }
      .addmemberimg :hover{
          transform: rotate(360deg);
      }
    }

    .el-radio-group{
      line-height: 3!important;
    }
    .el-radio{
      margin-left:0px!important;
      min-width:111px;
      max-width:600px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      padding-left: 25px;
    }
    .radios{
      width: 470px;
      /*display: inline-block;*/
    }
    .tong:hover {
      color:white;
    }
  }
  .edit-page .item-block .block-tt-line{
    margin-bottom:17px !important;
  }
  .lin{
    line-height: 16px!important;
  }
.goodness .el-form-item__error{
  top:83%!important;
}
</style>
