module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		// 첫번째 인자 : 테이블 이름
		'board',

		// 두번째 인자 : 컬럼 모델
		{
			// 시퀄라이즈는 기본적으로 id를 기본키로 연결하므로 id 컬럼은 적을 필요가 없음
			wrt_seq : {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			title : {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			contents : {
				type: DataTypes.STRING(4000),
				allowNull: false
			},
			hit_cnt : {
				type: DataTypes.INTEGER
			},
			reg_id : {
				type: DataTypes.STRING(30),
				allowNull: false
			},
			reg_date : {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('now()')
			},
			mod_id : {
				type: DataTypes.STRING(30)
			},
			mod_date : {
				type: DataTypes.DATE,
			}
		},
		// 세번째 인자 : 테이블 옵션
		{
			timestamps : false,
			tableName: 'board'
		}
	)
}
